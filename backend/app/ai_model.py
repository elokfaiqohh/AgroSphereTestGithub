import tensorflow as tf
import numpy as np
from PIL import Image
import io
MODEL_PATH = "model/ganoderma_model.h5"

model = tf.keras.models.load_model(MODEL_PATH)  # load sekali pada startup

def preprocess_image_bytes(file_bytes: bytes, target_size=(224,224)):
    img = Image.open(io.BytesIO(file_bytes)).convert("RGB")
    img = img.resize(target_size)
    arr = np.array(img)/255.0
    arr = np.expand_dims(arr, 0)
    return arr

def predict_from_file(uploaded_file):
    contents = uploaded_file.file.read()
    x = preprocess_image_bytes(contents)
    preds = model.predict(x)
    # contoh: model 2-class => preds = [[prob_normal, prob_ganoderma]]
    prob = float(preds[0].max())
    label = "ganoderma" if preds[0][1] > preds[0][0] else "healthy"
    return {"label": label, "confidence": prob}
