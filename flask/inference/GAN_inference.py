import random
import numpy as np
from PIL import Image
import torchvision.transforms as transforms
import torch
import torch.nn.functional as F
import cv2
import time 

lib_path = r"C:\Users\Admin\AppData\Local\Programs\Python\Python37\Lib\site-packages\spatial_correlation_sampler_backend.cp37-win_amd64.pyd"
warp_model_path = "inference/warp_model.pt"
gen_model_path = "inference/gen_model.pt"


class InferenceEngine(object):
    def __init__(self):
        ### TODO: 変数を初期化 ###
        self =self



    def get_params(self,size):
        w, h = size
        new_h = h
        new_w = w

        x = random.randint(0, np.maximum(0, new_w - 512))
        y = random.randint(0, np.maximum(0, new_h - 512))

        flip = 0
        return {'crop_pos': (x, y), 'flip': flip}

    def __scale_width(self,img, target_width, method=Image.BICUBIC):
        ow, oh = img.size
        if (ow == target_width):
            return img    
        w = target_width
        h = int(target_width * oh / ow)    
        return img.resize((w, h), method)

    def get_transform(self,params, method=Image.BICUBIC, normalize=True):
        loadSize = 512
        fineSize = 512
        transform_list = []
        transform_list.append(transforms.Lambda(lambda img: self.__scale_width(img, loadSize, method)))
        osize = [256,192]
        transform_list.append(transforms.Scale(osize, method))  
        transform_list += [transforms.ToTensor()]

        if normalize:
            transform_list += [transforms.Normalize((0.5, 0.5, 0.5),
                                                    (0.5, 0.5, 0.5))]
        return transforms.Compose(transform_list)

    def infer(self,person_image, clothes_image, clothes_edge):

        #person_image_path = "dataset/test_img/000066_0.jpg"
        #I = Image.open(person_image_path).convert('RGB')
        I = Image.fromarray(person_image).convert('RGB')
        
        params = self.get_params(I.size)
        transform = self.get_transform(params)
        transform_E = self.get_transform(params, method=Image.NEAREST, normalize=False)

        I_tensor = transform(I).unsqueeze(0)

        #clothes_image_path = "dataset/test_clothes/003434_1.jpg"
        #C = Image.open(clothes_image_path).convert('RGB')
        C = Image.open(clothes_image).convert('RGB')
        C_tensor = transform(C).unsqueeze(0)

        #cloth_edge_path = "dataset/test_edge/003434_1.jpg"
        E = Image.open(clothes_edge).convert('L')
        E_tensor = transform_E(E).unsqueeze(0)

        data = { 'image': I_tensor,'clothes': C_tensor, 'edge': E_tensor}

        torch.ops.load_library(lib_path)

        warp_model = torch.jit.load(warp_model_path)
        gen_model = torch.jit.load(gen_model_path)

        real_image = data['image']
        clothes = data['clothes']

        edge = data['edge']
        edge = torch.FloatTensor((edge.detach().numpy() > 0.5).astype(np.int))
        clothes = clothes * edge

        flow_out = warp_model(real_image.cpu(), clothes.cpu())
        warped_cloth, last_flow, = flow_out
        warped_edge = F.grid_sample(edge.cpu(), last_flow.permute(0, 2, 3, 1),
                        mode='bilinear', padding_mode='zeros')

        gen_inputs = torch.cat([real_image.cpu(), warped_cloth, warped_edge], 1)
        gen_outputs = gen_model(gen_inputs)
        p_rendered, m_composite = torch.split(gen_outputs, [3, 1], 1)
        p_rendered = torch.tanh(p_rendered)
        m_composite = torch.sigmoid(m_composite)
        m_composite = m_composite * warped_edge
        p_tryon = warped_cloth * m_composite + p_rendered * (1 - m_composite)

        #a = real_image.float().cpu()
        #b= clothes.cpu()
        c = p_tryon
        #combine = torch.cat([a[0],b[0],c[0]], 2).squeeze()
        combine = c.squeeze()
        cv_img=(combine.permute(1,2,0).detach().cpu().numpy()+1)/2
        output=(cv_img*255).astype(np.uint8)

        return output