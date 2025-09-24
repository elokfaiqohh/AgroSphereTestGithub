import tensorflow as tf
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Dense
import os

# Pastikan folder model ada
if not os.path.exists("model"):
    os.makedirs("model")

# Buat model dummy sederhana
model = Sequential([Dense(1, input_shape=(1,))])
model.save("model/ganoderma_model.h5")

print("Model dummy berhasil dibuat di model/ganoderma_model.h5")
