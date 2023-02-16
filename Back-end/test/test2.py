from scipy.spatial.distance import cosine
import numpy as  np
from math import *
from math import *

import numpy as  np
from scipy.spatial.distance import cosine

a = [1, 2, 3, 4]
a = np.array(a)
# a = a.reshape((4,1))
b = [1, 2, 3, 5]
b = np.array(b)
# b = b.reshape((4,1))
# print(b.shape)
# print(a.shape)
print(1 - cosine(a, b))

c = sum(a * b)
d = sqrt(sum(np.power(a, 2))) * sqrt(sum(np.power(b, 2)))
print(c / d)
