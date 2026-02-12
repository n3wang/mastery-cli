# High-Quality Flashcards: 2A003---Generative-Deep-Learning_-Teaching-Machines-To-Paint-Write-Compose-and-Play-OReilly-Media-2023David-Foster--_processed (Part 9)


**Starting Chapter:** The Decoder

---


#### Autoencoder Suitability for Generative Modeling
Background context explaining how autoencoders are suitable for generative modeling. Autoencoders, by design, compress input data into a lower-dimensional latent space and then reconstruct it back to its original form. This process can be seen as an implicit model that maps inputs to a latent space where the same encoding and decoding transformations occur.
:p How does the autoencoder architecture make it suitable for generative modeling?
??x
Autoencoders are well-suited for generative modeling because they inherently learn a compressed representation (latent space) of the input data. The encoder part of the autoencoder compresses the input into a lower-dimensional latent space, while the decoder reconstructs the input from this latent representation. This process captures the essence of the input in a more compact form and can generate new samples by sampling from the learned latent space.
x??

---


#### Building an Autoencoder with Keras
Background context explaining how to build an autoencoder using Keras. We will use Keras, a high-level neural networks API, which is part of TensorFlow, to construct our autoencoder model.

:p How do you build and train an autoencoder from scratch using Keras?
??x
To build and train an autoencoder in Keras, follow these steps:

1. **Import Libraries**: Import necessary libraries including `tensorflow.keras`.
2. **Define the Model**: Define both the encoder and decoder parts of the model.
3. **Compile the Model**: Compile the entire autoencoder.
4. **Train the Model**: Train the autoencoder using a dataset.

Here is an example in pseudocode:

```python
import tensorflow as tf

# Step 1: Define Encoder
def build_encoder(input_shape, latent_dim):
    encoder_inputs = tf.keras.Input(shape=input_shape)
    # Add layers to encode input into lower-dimensional space
    encoded = ...
    return tf.keras.Model(encoder_inputs, encoded)

# Step 2: Define Decoder
def build_decoder(latent_dim, output_shape):
    decoder_inputs = tf.keras.Input(shape=(latent_dim,))
    # Add layers to decode from latent space back to original shape
    decoded = ...
    return tf.keras.Model(decoder_inputs, decoded)

# Step 3: Build Autoencoder
def build_autoencoder(input_shape, latent_dim):
    encoder = build_encoder(input_shape, latent_dim)
    decoder = build_decoder(latent_dim, input_shape)
    
    # Connect Encoder and Decoder
    encoded_input = tf.keras.Input(shape=(latent_dim,))
    decoded_output = decoder(encoder(encoded_input))
    autoencoder = tf.keras.Model(encoded_input, decoded_output)

# Step 4: Compile Autoencoder
autoencoder.compile(optimizer='adam', loss='mse')

# Step 5: Train Autoencoder
(x_train, y_train), (x_test, y_test) = ...
autoencoder.fit(x_train, x_train, epochs=10)
```

In this example:
- `build_encoder` and `build_decoder` functions are defined to create the encoder and decoder parts of the model.
- The autoencoder is then compiled with an optimizer and loss function.

x??

---


#### Limitations of Autoencoders
Background context explaining common limitations of standard autoencoders, such as their deterministic nature and inability to generate diverse outputs from a single latent sample. Standard autoencoders are generally deterministic: for a given input, the encoder maps it to a fixed latent vector, which is then decoded back to the original form.

:p What are some limitations of standard autoencoders?
??x
Standard autoencoders have several limitations:
1. **Determinism**: Given an input, the latent space representation is highly deterministic and not very flexible.
2. **Latent Space Diversity**: The learned latent space often lacks diversity; a single point in the latent space typically corresponds to only one or few similar outputs.
3. **Limited Generation Capabilities**: Because of their deterministic nature, autoencoders struggle to generate diverse outputs from a single latent sample.

x??

---


#### Variational Autoencoder (VAE) Architecture
Background context explaining how VAEs address limitations by introducing randomness into the latent space and enabling more flexible generative models. The key idea is to use probabilistic representations in the latent space, making it possible to explore different regions of the space during generation.

:p What is the architecture of a Variational Autoencoder (VAE)?
??x
A Variational Autoencoder (VAE) addresses the limitations of standard autoencoders by introducing randomness into the latent space. The core idea is to have the encoder map inputs not directly to a deterministic latent vector, but to parameters of a probability distribution from which a random sample can be drawn.

Here's an overview:

1. **Encoder**: Instead of outputting a single vector in the latent space, the encoder outputs parameters (mean and log variance) of a Gaussian distribution.
2. **Reparameterization Trick**: Sample from this distribution using reparameterization to get a latent variable `z`.
3. **Decoder**: Use the sampled latent variable `z` to generate an output.

Here is pseudocode for building a VAE:

```python
def build_vae(input_shape, latent_dim):
    encoder_inputs = tf.keras.Input(shape=input_shape)
    
    # Encoder Layers
    x = ...
    z_mean, z_log_var = ..., ...

    def sampling(args):
        """Reparameterization trick by sampling from an isotropic unit Gaussian."""
        z_mean, z_log_var = args
        epsilon = tf.random.normal(tf.shape(z_mean))
        return z_mean + tf.exp(0.5 * z_log_var) * epsilon

    # Sample from the distribution
    z = Lambda(sampling)([z_mean, z_log_var])
    
    # Decoder Layers
    x_decoded = ...
    
    vae = Model(encoder_inputs, x_decoded)
    return vae, encoder, decoder

# Build and compile VAE
vae, encoder, decoder = build_vae(input_shape, latent_dim)
vae.compile(optimizer='adam', loss=vae_loss)

def vae_loss(x, x_reconstructed):
    reconstruction_loss = tf.reduce_mean(
        tf.reduce_sum(tf.keras.losses.binary_crossentropy(x, x_reconstructed), axis=[1, 2]))
    kl_loss = -0.5 * tf.reduce_mean(1 + z_log_var - tf.square(z_mean) - tf.exp(z_log_var))
    return reconstruction_loss + kl_loss

vae.fit(x_train, epochs=10)
```

In this example:
- The encoder outputs mean and log variance of the latent distribution.
- A sampling function is used to generate a random sample from the Gaussian distribution.
- This sample is then passed through the decoder.

x??

---


#### Using Variational Autoencoders for Image Generation
Background context explaining how VAEs can be used to generate new images by sampling from the latent space. By training a VAE on image data, it learns an implicit generative model that maps points in the latent space back to high-dimensional images.

:p How do you use a Variational Autoencoder (VAE) to generate new images?
??x
To generate new images using a trained variational autoencoder:

1. **Sample from Latent Space**: Generate random samples from the latent distribution.
2. **Decode Samples**: Pass these samples through the decoder of the VAE to get generated images.

Here is an example pseudocode for generating images:

```python
# Assume vae, encoder, and decoder are already defined

def generate_images(num_samples):
    # Sample from a standard normal distribution (latent space)
    latent_samples = tf.random.normal(shape=(num_samples, latent_dim))
    
    # Pass the samples through the decoder to get generated images
    generated_images = decoder.predict(latent_samples)
    
    return generated_images

# Generate and display 10 random images
generated_images = generate_images(10)

for img in generated_images:
    plt.imshow(img.reshape(input_shape), cmap='gray')
    plt.show()
```

In this example, a function `generate_images` is defined that generates random samples from the latent space using a standard normal distribution and then decodes these samples to produce images.

x??

---


#### Latent Space Arithmetic with Variational Autoencoders
Background context explaining how VAEs enable manipulation of generated images through arithmetic operations in the latent space. By manipulating the latent variables, one can explore different regions of the generative model's output space.

:p How can you use latent space arithmetic to manipulate generated images using a Variational Autoencoder (VAE)?
??x
Latent space arithmetic with VAEs allows for manipulation of generated images by performing operations on the latent vectors. Here’s how it works:

1. **Encode Input Images**: Encode input images into their corresponding latent representations.
2. **Perform Arithmetic Operations**: Perform addition or other operations in the latent space.
3. **Decode Resulting Latents**: Decode the resulting latent vectors to generate new images.

Example pseudocode for performing arithmetic on latent variables and generating images:

```python
# Assume vae, encoder, decoder are already defined

def manipulate_images(img1, img2):
    # Encode input images into their corresponding latent representations
    z1_mean, _, _ = encoder.predict(img1.reshape(1, *input_shape))
    z2_mean, _, _ = encoder.predict(img2.reshape(1, *input_shape))
    
    # Perform arithmetic operation (e.g., addition)
    z_mean_new = 0.5 * (z1_mean + z2_mean)  # Example: simple average
    
    # Decode the resulting latent vector to get a new image
    generated_image = decoder.predict(z_mean_new.reshape(1, latent_dim))
    
    return generated_image

# Encode two input images and perform arithmetic in the latent space
img1_encoded = encoder.predict(x_train[0].reshape(1, *input_shape))[0]
img2_encoded = encoder.predict(x_train[1].reshape(1, *input_shape))[0]

new_image = manipulate_images(img1_encoded, img2_encoded)
plt.imshow(new_image.reshape(input_shape), cmap='gray')
```

In this example:
- The `manipulate_images` function encodes two input images into their latent representations.
- Arithmetic operations are performed on these latent vectors (e.g., averaging).
- The resulting latent vector is decoded to generate a new image.

x??

---

---


#### Autoencoder Overview
Autoencoders are neural networks designed to reconstruct their input data. The goal is to learn a compressed representation (encoding) of the input and then decode it back into the original space, ideally with minimal loss.

:p What is an autoencoder?
??x
An autoencoder is a type of artificial neural network used to learn efficient codings of input data. It consists of two main parts: an encoder that compresses the input into a latent variable representation (encoding), and a decoder that reconstructs the original input from this encoding.

The objective is to minimize the difference between the input and reconstructed output, which can be achieved by training the autoencoder using backpropagation with a loss function like mean squared error.

Code for an autoencoder in Keras could look as follows:
```python
from keras.layers import Input, Dense
from keras.models import Model

# Define the encoder
input_img = Input(shape=(784,))
encoded = Dense(128, activation='relu')(input_img)
encoded = Dense(64, activation='relu')(encoded)
encoded = Dense(32, activation='relu')(encoded)

# Define the decoder
decoded = Dense(64, activation='relu')(encoded)
decoded = Dense(128, activation='relu')(decoded)
decoded = Dense(784, activation='sigmoid')(decoded)

autoencoder = Model(input_img, decoded)

# Compile and train the autoencoder
autoencoder.compile(optimizer='adam', loss='binary_crossentropy')
```
x??

---


#### Encoder in Autoencoders
The encoder network is responsible for transforming high-dimensional input data into a lower-dimensional latent space representation. This process compresses the information from the original space to a smaller, more manageable form.

:p What does the encoder do in an autoencoder?
??x
The encoder transforms high-dimensional input data into a lower-dimensional latent vector (embedding). The objective is to capture the most important features of the input data while discarding noise or irrelevant details. This compressed representation can be used for tasks like dimensionality reduction and feature learning.

Code example:
```python
# Encoder Model
encoder_input = Input(shape=(28, 28, 1))
x = Conv2D(32, (3, 3), activation='relu', padding='same')(encoder_input)
x = MaxPooling2D((2, 2), padding='same')(x)
x = Conv2D(64, (3, 3), activation='relu', padding='same')(x)
encoded = MaxPooling2D((2, 2), padding='same')(x)

# Decoder Model
decoded = UpSampling2D((2, 2))(encoded)
decoded = Conv2D(64, (3, 3), activation='relu', padding='same')(decoded)
decoded = UpSampling2D((2, 2))(decoded)
output = Conv2D(1, (3, 3), activation='sigmoid', padding='same')(decoded)

# Autoencoder
autoencoder = Model(encoder_input, output)
```
x??

---


#### Decoder in Autoencoders
The decoder network takes the latent vector from the encoder and reconstructs it back into the original input space. Its goal is to invert the encoding process performed by the encoder.

:p What does the decoder do in an autoencoder?
??x
The decoder's role is to take the lower-dimensional latent representation (encoding) produced by the encoder and transform it back into a high-dimensional output that closely resembles the original input. This involves using multiple layers of neurons to gradually reconstruct the data from the compressed form.

Code example:
```python
# Decoder Model
decoder_input = Input(shape=(4, 4, 64))
x = UpSampling2D((2, 2))(decoder_input)
x = Conv2D(64, (3, 3), activation='relu', padding='same')(x)
x = UpSampling2D((2, 2))(x)
decoded = Conv2D(1, (3, 3), activation='sigmoid', padding='same')(x)

# Autoencoder
autoencoder = Model(decoder_input, decoded)
```
x??

---


#### Latent Space in Autoencoders
The latent space is the lower-dimensional representation of the input data that the encoder produces during training. This space captures the essential features and patterns within the data, allowing for more efficient storage and manipulation.

:p What is the latent space in autoencoders?
??x
The latent space (or embedding) is a compact representation of the input data produced by the encoder. It serves as an intermediate step between the original high-dimensional data and the reconstructed output.

In the context of autoencoders, the goal is to learn a meaningful latent space where similar inputs are close together, which can be useful for tasks like anomaly detection, dimensionality reduction, or generating new samples.

For example, in an autoencoder that encodes images of clothing items into 32-dimensional vectors:
```python
# Encoder Model
encoded = Dense(64, activation='relu')(input_img)
encoded = Dense(32, activation='relu')(encoded)
```
The `encoded` layer produces a 32-dimensional vector representing the latent space for each input image.

x??

---


#### Training an Autoencoder
Training an autoencoder involves adjusting the weights of both the encoder and decoder networks to minimize the reconstruction loss between the original input and the reconstructed output. This is typically done using backpropagation and gradient descent.

:p How do you train an autoencoder?
??x
To train an autoencoder, you need to define a model that includes both an encoder and a decoder. The training process involves feeding input data into the network and adjusting the weights of the model so that the output closely matches the original input.

Here's a step-by-step example using Keras:
```python
from keras.layers import Input, Dense
from keras.models import Model

# Define the encoder
input_img = Input(shape=(784,))
encoded = Dense(128, activation='relu')(input_img)
encoded = Dense(64, activation='relu')(encoded)
encoded = Dense(32, activation='relu')(encoded)

# Define the decoder
decoded = Dense(64, activation='relu')(encoded)
decoded = Dense(128, activation='relu')(decoded)
decoded = Dense(784, activation='sigmoid')(decoded)

autoencoder = Model(input_img, decoded)

# Compile and train the autoencoder
autoencoder.compile(optimizer='adam', loss='binary_crossentropy')

# Train the model
autoencoder.fit(x_train, x_train,
                epochs=50,
                batch_size=256,
                shuffle=True,
                validation_data=(x_test, x_test))
```
The `autoencoder.fit` function trains the model using the input data. The loss function used here is binary cross-entropy, which measures the dissimilarity between the predicted and actual values.

x??

---


#### Autoencoder Architecture Overview
Background context: An autoencoder is a type of neural network used to learn efficient representations (encoding) and decodings of input data. It consists of two main parts: an encoder that maps the input data into a latent space, and a decoder that reconstructs the original data from the latent representation.

:p What is the purpose of an autoencoder?
??x
The primary goal of an autoencoder is to learn a compressed (latent) representation of the input data. This compressed representation can be useful for tasks such as dimensionality reduction, feature learning, and generating new samples that are similar to the training set.
x??

---


#### Embedding in Autoencoders
Background context: In the context of autoencoders, an embedding refers to a lower-dimensional representation (latent space) of the input data. The encoder maps the input data into this latent space, while the decoder reconstructs the original data from this compressed form.

:p What is the term used for the output of the encoder in an autoencoder?
??x
The term used for the output of the encoder in an autoencoder is the embedding (z).
x??

---


#### Encoder Architecture and Example
Background context: The encoder takes an input image and maps it to a lower-dimensional latent space. In this example, we create an encoder with multiple convolutional layers to capture higher-level features.

:p What are the steps involved in building the encoder architecture as described?
??x
The steps involve creating an input layer for the image, followed by three Conv2D layers that progressively reduce the spatial dimensions while increasing the number of channels. The final output is flattened and connected to a Dense layer representing the latent space.

Code example:
```python
from tensorflow.keras.layers import Input, Conv2D, Flatten, Dense
from tensorflow.keras.models import Model

# Define the input shape for the image (32x32 pixels with 1 channel)
encoder_input = Input(shape=(32, 32, 1), name="encoder_input")

# Apply three convolutional layers
x = Conv2D(32, (3, 3), strides=2, activation='relu', padding='same')(encoder_input)
x = Conv2D(64, (3, 3), strides=2, activation='relu', padding='same')(x)
x = Conv2D(128, (3, 3), strides=2, activation='relu', padding='same')(x)

# Flatten the output for dense connections
shape_before_flattening = K.int_shape(x)[1:]

x = Flatten()(x)

# Dense layer to represent the latent space (in this case, 2D)
encoder_output = Dense(2, name="encoder_output")(x)

# Create the encoder model
encoder = Model(encoder_input, encoder_output)
```
x??

---


#### Decoder Architecture in Autoencoders
Background context: The decoder takes a latent vector from the latent space and reconstructs it into an output similar to the input. It learns how to generate images based on points in the latent space.

:p What is the role of the decoder in an autoencoder?
??x
The role of the decoder in an autoencoder is to take the compressed (latent) representation and reconstruct it back into a form that resembles the original input data.
x??

---


#### Autoencoders for Denoising
Background context: Autoencoders can be used to clean noisy images by learning to ignore noise during the encoding process. However, this approach limits the use of low-dimensional latent spaces.

:p Why might a 2D latent space be insufficient for denoising tasks?
??x
A 2D latent space is too limited in complexity to capture sufficient relevant information from noisy input images, making it difficult for the autoencoder to learn effective noise-reduction strategies.
x??

---


#### Training Autoencoders
Background context: An autoencoder aims to minimize reconstruction error between the original and reconstructed data. The training process involves backpropagation through the network.

:p What is the objective function in an autoencoder during training?
??x
The objective function in an autoencoder during training is to minimize the difference (typically using mean squared error) between the input image and its reconstructed version.
x??

---

---


#### Stack Conv2D Layers Sequentially
Background context: This involves sequentially stacking Conv2D layers on top of each other to build the encoder part of an autoencoder. The number and type of convolutional layers can significantly affect model performance, parameter count, and runtime.

:p How many Conv2D layers are suggested to be used in this stack?
??x
We are suggested to use multiple Conv2D layers sequentially, but the exact number is not specified in the text. Experimentation with different numbers will help understand their impact on model parameters, performance, and runtime.
x??

---


#### Connect Vector to 2D Embeddings with Dense Layer
Background context: The flattened vector is connected to the 2D embeddings using a Dense layer, forming part of the encoder.

:p How do you connect the output from the Conv2D layers to the 2D embedding?
??x
You connect the output from the Conv2D layers by flattening it into a vector and then connecting this vector to the 2D embeddings through a Dense layer. This forms the encoder part of the autoencoder.
x??

---


#### Decoder Model Overview
Background context: The decoder mirrors the encoder but uses Conv2DTranspose layers to gradually expand the size of the tensor back to the original image dimensions.

:p What is the architecture of the decoder?
??x
The decoder is structured as a mirror image of the encoder, using Conv2DTranspose layers instead of Conv2D layers. It starts from the 2D embedding and expands the tensor back to the original image size by doubling the dimensions at each layer.
x??

---


#### Convolutional Transpose Layers (Conv2DTranspose)
Background context: These layers are used in the decoder to double the size of the input tensor in both dimensions.

:p What is the role of Conv2DTranspose layers?
??x
The role of Conv2DTranspose layers is to gradually expand the size of each layer, using strides of 2, until the original image dimension (32 × 32) is reached. This allows for the reconstruction of the input image from its 2D embedding.
x??

---


#### Strides in Conv2DTranspose
Background context: The parameter `strides` determines how much to expand the tensor size and affects the internal zero padding between pixels.

:p How does the `strides` parameter work in Conv2DTranspose layers?
??x
The `strides` parameter in Conv2DTranspose layers controls the expansion of the input tensor's dimensions. Setting `strides = 2` doubles the height and width of the input tensor, effectively performing an upsampling operation while handling internal zero padding.
x??

---


#### Example Code for Autoencoder Layers
Background context: The following code snippets illustrate how to set up the autoencoder layers using Keras.

:p Provide a pseudocode example for setting up Conv2D and Conv2DTranspose layers in an autoencoder?
??x
```python
# Encoder setup
inputs = Input(shape=(32, 32, 1))
conv1 = Conv2D(64, (3, 3), activation='relu', padding='same')(inputs)
conv2 = Conv2D(32, (3, 3), activation='relu', padding='same')(conv1)
encoded = Flatten()(conv2)

# Decoder setup
x = Dense(7 * 7 * 32, activation='relu')(encoded)
x = Reshape((7, 7, 32))(x)
deconv1 = Conv2DTranspose(64, (3, 3), strides=2, padding='same', activation='relu')(x)
deconv2 = Conv2DTranspose(1, (3, 3), strides=2, padding='same', activation='sigmoid')(deconv1)

autoencoder = Model(inputs=inputs, outputs=deconv2)
```
The code sets up the autoencoder by stacking Conv2D and Conv2DTranspose layers with appropriate parameters to build both the encoder and decoder parts.
x??

---

---


#### Autoencoder Model in Keras
Background context: The autoencoder model combines the encoder and decoder to form a complete architecture that can be trained. It takes an input image, processes it through the encoder to obtain a latent representation, and then passes this representation through the decoder to reconstruct the original image.

Relevant code:
```python
autoencoder = Model(encoder_input, decoder(encoder_output))
```

:p How is the autoencoder model created in Keras?
??x
The autoencoder model is created by connecting the encoder's output to the decoder. This forms a pipeline where an input image first passes through the encoder to obtain a latent space representation and then this representation is passed through the decoder to reconstruct the original image.

```python
# Define the autoencoder model
autoencoder = Model(encoder_input, decoder_output)
```
x??

---


#### Loss Function Selection for Autoencoders
Background context: The choice of loss function can significantly impact the performance and nature of the reconstructed images. Common choices include Root Mean Squared Error (RMSE) and Binary Cross-Entropy.

Relevant code:
```python
autoencoder.compile(optimizer="adam", loss="binary_crossentropy")
```

:p What is the purpose of choosing a loss function in an autoencoder?
??x
The loss function serves as a metric to optimize during training, guiding the model towards minimizing the difference between the original input and its reconstruction. Different loss functions can influence the quality and characteristics of the reconstructed images.

- **Binary Cross-Entropy Loss**: Penalizes errors more heavily when the predicted values are far from the true values, especially at the extremes.
- **RMSE Loss**: Treats overestimation and underestimation symmetrically, which may lead to sharper edges in the reconstructed images but can also result in pixelization.

```python
# Example of compiling with binary cross-entropy loss
autoencoder.compile(optimizer="adam", loss="binary_crossentropy")
```
x??

---


#### Training the Autoencoder
Background context: Once the autoencoder is defined, it needs to be trained on a dataset. The training process involves feeding both input and output data into the model so that it learns to reconstruct images from their latent representations.

Relevant code:
```python
autoencoder.fit(X_train, X_train, epochs=num_epochs)
```

:p How do you train an autoencoder in Keras?
??x
Training an autoencoder is done by passing both the input and output data to the model during training. The input data is used as the target for reconstruction, allowing the encoder-decoder pair to learn a mapping from the high-dimensional space back to itself.

```python
# Training example with X_train as both input and target
autoencoder.fit(X_train, X_train, epochs=num_epochs)
```
x??

---


#### Reconstructing Images Using Autoencoder
Background context: After training an autoencoder, it is important to check its ability to accurately reconstruct input images. This involves comparing the original and reconstructed images to ensure that the model has learned a useful representation of the data.

:p How can we test the ability of the autoencoder to reconstruct images?
??x
We can test this by passing images from the test set through the autoencoder and comparing the output to the original images.
```python
example_images = x_test[:5000]
predictions = autoencoder.predict(example_images)
```
x??

---


#### Visualizing the Latent Space
Background context: To understand how the encoder is representing images in a lower-dimensional space, we can visualize the latent space by plotting the embedded representations of test images. This helps us identify natural groupings and structures within the data.

:p How do we embed images using the encoder and visualize them?
??x
We can use the encoder to predict the embeddings for example images from the test set, then plot these embeddings.
```python
embeddings = encoder.predict(example_images)
plt.figure(figsize=(8, 8))
plt.scatter(embeddings[:, 0], embeddings[:, 1], c="black", alpha=0.5, s=3)
plt.show()
```
x??

---


#### Understanding the Latent Space Structure
Background context: The latent space can be understood by visualizing it and observing how different classes of images are grouped. This helps us understand the learned features and their distribution.

:p What does the structure of the latent space tell us about the data?
??x
The structure of the latent space reveals natural groupings of similar items, such as trousers clustering together and ankle boots forming another cluster.
```
The latent space embeds images into a 2D space where different clothing categories form distinct clusters. For instance:
- Dark blue cloud: Trousers
- Red cloud: Ankle boots
```
x??

---

