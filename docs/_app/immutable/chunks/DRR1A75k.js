import"./DsnmJJEf.js";import"./BUwabaiJ.js";import{f as o,s as i,a1 as n,a as s,c as m,b as l}from"./TpHHFT-8.js";import{h as p}from"./BYpuDceu.js";import"./DpbtlO4N.js";var c=o('<p><a href="https://courses.cs.washington.edu/courses/cse312/18sp/lectures/naive-bayes/naivebayesnotes.pdf" rel="nofollow">UWashington naivebayesnotes.pdf</a></p> <p><a href="https://github.com/BryanNoBryan/SpamNaiveBayes/blob/master/spammer.py" rel="nofollow">code</a></p> <p><a href="https://github.com/BryanNoBryan/SpamNaiveBayes/blob/master/spam.csv" rel="nofollow">dataset</a></p> <pre class="language-undefined"><!></pre>',1);function g(e){var t=c(),r=i(n(t),6),a=m(r);p(a,()=>`<code class="language-undefined">#v2
#ML
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
#import pandas
import pandas as pd

#Auxillary
import math

#preprocessing
import re
import nltk
from nltk.stem import WordNetLemmatizer
lemmatizer = WordNetLemmatizer()
from nltk.tokenize import word_tokenize
# nltk.download(&#39;punkt&#39;)
# nltk.download(&#39;wordnet&#39;)

#too large takes some time to run
TRAIN_AND_TEST_SIZE = 1000
TEST_FRACTION = 0.1

data = pd.read_csv(&quot;spam.csv&quot;)
data.drop(data.columns[[0, 1]], axis=1, inplace=True)
data = data.iloc[:TRAIN_AND_TEST_SIZE]

tokenized_list = []

# Removing punctuations in string
# Using regex
for i in range(len(data)):
    #remove punctuation
    data.iloc[i, 0] = re.sub(r&#39;[^ws]&#39;, &#39;&#39;, data.iloc[i, 0])
    #remove escape chars and numbers
    data.iloc[i, 0] = re.sub(r&#39;[&#92;n&#92;r]|[d]&#39;, &#39; &#39;, data.iloc[i, 0])
    # remove URLs
    data.iloc[i, 0] = re.sub(r&#39;https?://S+|www.S+&#39;, &#39; &#39;, data.iloc[i, 0])


    # lemmatized_list = [lemmatizer.lemmatize(token) for token in data.iloc[i, 0].split(&#39; &#39;)]
    tokenized_string = word_tokenize(data.iloc[i, 0])
    lemmatized_list = [lemmatizer.lemmatize(token).lower() for token in tokenized_string]

    #use string not generator
    tokenized_list.append(&#39; &#39;.join(lemmatized_list))

# print(tokenized_list)

vectorizor = CountVectorizer()
cv_matrix = vectorizor.fit_transform(tokenized_list)

vectored_data = pd.DataFrame(data=cv_matrix.toarray(),columns = vectorizor.get_feature_names_out())

X_train, X_test, y_train, y_test = train_test_split(vectored_data, data.iloc[:,1], test_size = TEST_FRACTION, random_state = 0)

#NAIVE BAYES BEGIN
#getting probability for if SPAM

val_count = y_train.value_counts()
spam_length = val_count[1]
ham_length = val_count[0]
prior_prob_spam = val_count[1] / (val_count[0] + val_count[1])
prior_prob_ham = val_count[0] / (val_count[0] + val_count[1])
print(&#39;prior_prob_spam: &#39; + str(float(prior_prob_spam)))

spam_word_freq = &#123;&#125;
spamicity = &#123;&#125;
for col in X_train.columns:
    spam_word_freq[col] = 0

length = len(X_train)
print(X_train.shape)

for i, col in enumerate(X_train.columns):
    for index, value in X_train[col].items():
        # is spam
        if ((y_train[index] == 1) and (value &gt; 0)):
            #col is the word
            spam_word_freq[col] += 1
    #smoothing
    spamicity[col] = (spam_word_freq[col]+1)/(spam_length+2)

    # print(i)
    # print(f&quot;Number of spam emails with the word &#123;col&#125;: &#123;spam_word_freq[col]&#125;&quot;)
    # print(f&quot;Spamicity of the word &#39;&#123;col&#125;&#39;: &#123;spamicity[col]&#125; &#92;n&quot;)

print(&#39;calced spamicity&#39;)
# print(spamicity)

ham_word_freq = &#123;&#125;
hamicity = &#123;&#125;
for col in X_train.columns:
    ham_word_freq[col] = 0

for i, col in enumerate(X_train.columns):
    for index, value in X_train[col].items():
        if ((y_train[index] == 0) and (value &gt; 0)):
            ham_word_freq[col] += 1
    
    #smoothing
    hamicity[col] = (ham_word_freq[col]+1)/(ham_length+2)

print(&#39;calced hamicity&#39;)
# print(ham_word_freq)


correct = 0
cases = len(X_test)
for i in range(cases):
    row = pd.DataFrame(X_test.iloc[i]).transpose()
    org_index = row.index[0]

    PS = prior_prob_spam
    PH = prior_prob_ham
    PWordS = 0
    PWordH = 0

    for name, data in row.items():
        if (data.iloc[0] &gt; 0):
            try:
                val = spamicity[name]
                # print(f&#39;spam &#123;name&#125; &#123;val&#125;&#39;)
                val = val if (val != 0) else (1 / spam_length)
                PWordS += math.log(val)
            except KeyError:
                PWordS += math.log(1 / spam_length)
            
            try:
                val = hamicity[name]
                # print(f&#39;ham &#123;name&#125; &#123;val&#125;&#39;)
                val = val if (val != 0) else (1 / ham_length)
                PWordH += math.log(val) 
            except KeyError:
                PWordH += math.log(1 / ham_length)
    
    PS = math.log(PS)
    PH = math.log(PH)
    #https://courses.cs.washington.edu/courses/cse312/18sp/lectures/naive-bayes/naivebayesnotes.pdf 
    isSpam = (PS + PWordS) &gt; (PH + PWordH)
    prob = 1 if isSpam else 0

    print(f&quot;~~~~~~~~~case &#123;i&#125;: &#123;prob&#125;    &#123;y_test[org_index]&#125;&quot;)
    if (round(prob) == y_test[org_index]):
        correct += 1

print(f&#39;&#123;correct&#125; correct / &#123;cases&#125; cases&#39;)
print(f&#39;&#123;round(((correct / cases) * 100),ndigits=2)&#125;% accuracy&#39;)


#BAD CAUSES UNDERFLOW
# correct = 0
# cases = len(X_test)
# for i in range(cases):
#     row = pd.DataFrame(X_test.iloc[i]).transpose()
#     org_index = row.index[0]

#     PS = prior_prob_spam
#     PH = prior_prob_ham
#     PWordS = 1
#     PWordH = 1

#     for name, data in row.items():
#         if (data.iloc[0] &gt; 0):
#             # print(&#39;true 2&#39;)
#             try:
#                 # print(&#39;true 3&#39;)
#                 val = spamicity[name]
#                 PWordS *= val if (val != 0) else (1 / spam_length)
#             except KeyError:
#                 # print(&#39;true 4&#39;)
#                 print(&#39;needed smoothing spam?&#39;)
#                 PWordS *= 1 / spam_length
            
#             try:
#                 # print(&#39;true 5&#39;)
#                 val = hamicity[name]
#                 PWordH *= val if (val != 0) else (1 / ham_length)
#             except KeyError:
#                 # print(&#39;true 6&#39;)
#                 print(&#39;needed smoothing ham?&#39;)
#                 PWordH *= 1 / ham_length
    
#     prob = (PS * PWordS) / ((PS * PWordS) + (PH * PWordH))
#     print(PS)
#     print(PH)
#     print(PWordS)
#     print(PWordH)
#     print((PS * PWordS))
#     print(((PS * PWordS) + (PH * PWordH)))
#     print((PH * PWordH))
#     print(f&quot;~~~~~~~~~case &#123;i&#125;: &#123;prob&#125;    &#123;y_test[org_index]&#125;&quot;)
#     if (round(prob) == y_test[org_index]):
#         correct += 1

# print(f&#39;&#123;correct&#125; correct / &#123;cases&#125; cases&#39;)
# print(f&#39;&#123;round(((correct / cases) * 100),ndigits=2)&#125;% accuracy&#39;)


# #V1
# #ML and plotting
# from sklearn import tree
# from sklearn.feature_extraction.text import CountVectorizer
# from sklearn.model_selection import train_test_split
# #One hot encoding
# from sklearn.preprocessing import OneHotEncoder
# import matplotlib.pyplot as plt
# #import pandas
# import pandas as pd
# #to split the array
# import numpy as np

# #Auxillary
# import math
# from collections import OrderedDict

# #preprocessing
# import re
# import nltk
# from nltk.stem import WordNetLemmatizer
# lemmatizer = WordNetLemmatizer()
# from nltk.tokenize import word_tokenize
# # nltk.download(&#39;punkt&#39;)
# # nltk.download(&#39;wordnet&#39;)

# data = pd.read_csv(&quot;spam.csv&quot;)
# data.drop(data.columns[[0, 1]], axis=1, inplace=True)
# data = data.iloc[:1000]

# tokenized_list = []

# # Removing punctuations in string
# # Using regex
# for i in range(len(data)):
#     #remove punctuation
#     data.iloc[i, 0] = re.sub(r&#39;[^ws]&#39;, &#39;&#39;, data.iloc[i, 0])
#     #remove escape chars and numbers
#     data.iloc[i, 0] = re.sub(r&#39;[&#92;n&#92;r]|[d]&#39;, &#39; &#39;, data.iloc[i, 0])
#     # remove URLs
#     data.iloc[i, 0] = re.sub(r&#39;https?://S+|www.S+&#39;, &#39; &#39;, data.iloc[i, 0])


#     # lemmatized_list = [lemmatizer.lemmatize(token) for token in data.iloc[i, 0].split(&#39; &#39;)]
#     tokenized_string = word_tokenize(data.iloc[i, 0])
#     lemmatized_list = [lemmatizer.lemmatize(token).lower() for token in tokenized_string]

#     #use string not generator
#     tokenized_list.append(&#39; &#39;.join(lemmatized_list))

# # print(tokenized_list)

# vectorizor = CountVectorizer()
# cv_matrix = vectorizor.fit_transform(tokenized_list)

# vectored_data = pd.DataFrame(data=cv_matrix.toarray(),columns = vectorizor.get_feature_names_out())

# X_train, X_test, y_train, y_test = train_test_split(vectored_data, data.iloc[:,1], test_size = 0.20, random_state = 0)

# #NAIVE BAYES BEGIN
# #https://www.analyticsvidhya.com/blog/2021/01/a-guide-to-the-naive-bayes-algorithm/ 

# #getting probability for if SPAM

# val_count = y_train.value_counts()
# spam_length = val_count[1]
# ham_length = val_count[0]
# prior_prob_spam = val_count[1] / (val_count[0] + val_count[1])
# print(&#39;prior_prob_spam: &#39; + str(float(prior_prob_spam)))

# spam_word_freq = &#123;&#125;
# spamicity = &#123;&#125;
# # for col in X_train.columns:
# #     spam_word_freq[col] = 0

# length = len(X_train)
# print(X_train.shape)

# for i, col in enumerate(X_train.columns):
#     for index, value in X_train[col].items():
#         # is spam
#         if (y_train[index] == 1 and value &gt; 0):
#             #col is the word
#             if (col in spam_word_freq):
#                 spam_word_freq[col] += 1
#             else:
#                 spam_word_freq[col] = 0
#     #smoothing
#     if (col in spam_word_freq):
#         spamicity[col] = (spam_word_freq[col]+1)/(spam_length+2)

#     # print(i)
#     # print(f&quot;Number of spam emails with the word &#123;col&#125;: &#123;spam_word_freq[col]&#125;&quot;)
#     # print(f&quot;Spamicity of the word &#39;&#123;col&#125;&#39;: &#123;spamicity[col]&#125; &#92;n&quot;)

# print(&#39;calced spamicity&#39;)
# print(spamicity)

# ham_word_freq = &#123;&#125;
# hamicity = &#123;&#125;
# # for col in X_train.columns:
# #     ham_word_freq[col] = 0

# for col in X_train.columns:
#     for index, value in X_train[col].items():
#         # is ham
#         if (y_train[index] == 0 and value &gt; 0):
#             #col is the word
#             if (col in ham_word_freq):
#                 ham_word_freq[col] += 1
#             else:
#                 ham_word_freq[col] = 0
#     #smoothing
#     if (col in ham_word_freq):
#         hamicity[col] = (ham_word_freq[col]+1)/(ham+2)

# print(&#39;calced hamicity&#39;)

# naive_bayes = &#123;&#125;
# for col in X_train.columns:
#     #smoothing
#     PWordSpam = 0
#     try: 
#         PWordSpam = spamicity[col]
#     except KeyError:
#         PWordSpam = 1 / (spam_length + 2)

#     PSpam = prior_prob_spam

#     PWordHam = 0
#     try: 
#         PWordHam = hamicity[col]
#     except KeyError:
#         PWordHam = 1 / (ham_length + 2)

#     PHam = 1 - PSpam
#     # https://medium.com/@insight_imi/sms-spam-classification-using-na%C3%AFve-bayes-classifier-780368549279
#     naive_bayes[col] = (PWordSpam * PSpam) / ((PWordSpam * PSpam) + (PWordHam * PHam))

# print(&#39;calced naive bayes&#39;)
# print(naive_bayes)

# correct = 0
# cases = len(X_test)
# for i in range(cases):
#     row = pd.DataFrame(X_test.iloc[i, :]).transpose()
#     org_index = row.index[0]
#     prob = 1
#     for name, data in row.items():
#         if (data.iloc[0] &gt; 0):
#             try:
#                 print(f&#39;&#123;name&#125; &#123;naive_bayes[name]&#125;&#39;)
#                 val = naive_bayes[name]
#                 prob *= val
#                 # prob *= (val != 0) if val else 1/(spam_length+2)
#             except KeyError:
#                 print(f&#39;smooth &#123;1/(length+2)&#125;&#39;)
#                 prob *= 1/(length+2)
#             print(f&#39;prob now is: &#123;prob&#125;&#39;)
        

#     print(f&quot;~~~~~~~~~case &#123;i&#125;: &#123;prob&#125;    &#123;y_test[org_index]&#125;&quot;)
#     if (round(prob) == y_test[org_index]):
#         correct += 1

# print(f&#39;&#123;correct&#125; correct / &#123;cases&#125; cases&#39;)
# print(f&#39;&#123;round(((correct / cases) * 100),ndigits=2)&#125;% accuracy&#39;)



# try:
#             pr_WS = spamicity[word]
#         except KeyError:
#             pr_WS = 1/(total_spam+2)  # Apply smoothing for word not seen in spam training data, but seen in ham training 
#             print(f&quot;prob &#39;&#123;word&#125;&#39; is a spam word: &#123;pr_WS&#125;&quot;)




# print(data.head())

# print(data.describe(include = &#39;all&#39;))

# print(data.groupby(&#39;label_num&#39;).describe())</code>`),l(r),s(e,t)}export{g as default};
