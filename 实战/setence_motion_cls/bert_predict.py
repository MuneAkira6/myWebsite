
import joblib
import bert_init
from bert4keras.snippets import sequence_padding, DataGenerator
from bert4keras.tokenizers import Tokenizer
from bert4keras.layers import PositionEmbedding
from keras.models import load_model
import numpy as np
import warnings
warnings.filterwarnings('ignore')
import importlib
import sys
import requests
importlib.reload(sys)

batch_size = 32
maxlen = 128
dict_path = '/root/实战/setence_motion_cls/albert_tiny_google_zh_489k/vocab.txt'
# 建立分词器
beret_tokenizer = Tokenizer(dict_path, do_lower_case=True)

def predict(input_text):

    test_token_ids,test_segment_ids = [],[]
    for text in [input_text]:
        token_ids, segment_ids = beret_tokenizer.encode(
            text, max_length=maxlen
        )
        test_token_ids.append(token_ids)
        test_segment_ids.append(segment_ids)
    test_token_ids = sequence_padding(test_token_ids)
    test_segment_ids =sequence_padding(test_segment_ids)
    pre_y = model_bert.predict([test_token_ids, test_segment_ids])
    return pre_y[0]

model_bert = load_model('/root/实战/setence_motion_cls/model/bert_model.h5',custom_objects={'PositionEmbedding':PositionEmbedding})

while 1:
    with open('/root/实战/input.txt', 'r', encoding='utf-8') as f:
        keywords = f.read()#拿到输入的关键词
    #根据输入的关键词，去数据库中找评论
    # 数据库用json
    if keywords == '':
        pass
    else:
        filename = '/root/实战/' + keywords + '.txt'
        f1 = open(filename, 'r', encoding='utf-8')
        input_text = f1.readline()
        with open('/root/实战/output.txt', 'w', encoding='utf-8') as f:#先清空
            f.write('')
        sum = 0
        cnt = 0
        while (input_text != ''):
            print(input_text)
            y = predict(input_text)
            result = int(round(y[1], 2) * 5 + 0.5)
            sum = sum + result
            cnt = cnt + 1
            input_text = f1.readline()
        with open('/root/实战/output.txt', 'a', encoding='utf-8') as f:
            f.write(str(sum / cnt))
        with open('/root/实战/input.txt', 'w', encoding='utf-8') as f:
            f.write('')
        keywords = ''
