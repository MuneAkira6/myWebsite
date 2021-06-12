
import joblib
from bert4keras.snippets import sequence_padding, DataGenerator
from bert4keras.tokenizers import Tokenizer
from bert4keras.layers import PositionEmbedding
from keras.models import load_model
import numpy as np
import warnings
warnings.filterwarnings('ignore')
import importlib
import sys
importlib.reload(sys)
# sys.setdefaultencoding('utf-8')

"""
#bert预训练模型+微调
"""
# while 1:
#     print(1)
# batch_size = 32
# maxlen = 128
# dict_path = '/Users/zongliang/Desktop/Python/setence_motion_cls/albert_tiny_google_zh_489k/vocab.txt'
# # 建立分词器
# beret_tokenizer = Tokenizer(dict_path, do_lower_case=True)

# def predict(input_text):

#     test_token_ids,test_segment_ids = [],[]
#     for text in [input_text]:
#         token_ids, segment_ids = beret_tokenizer.encode(
#             text, max_length=maxlen
#         )
#         test_token_ids.append(token_ids)
#         test_segment_ids.append(segment_ids)
#     test_token_ids = sequence_padding(test_token_ids)
#     test_segment_ids =sequence_padding(test_segment_ids)
#     pre_y = model_bert.predict([test_token_ids, test_segment_ids])
#     return pre_y[0]

# model_bert = load_model('/Users/zongliang/Desktop/Python/setence_motion_cls/model/bert_model.h5',custom_objects={'PositionEmbedding':PositionEmbedding})




