# Face recognition
A facial recognition API in Node.js.


## Installing

Clone the repository:
```bash
git clone https://github.com/ravinmor/face-recognition.git
```
Navigate to the folder:
```bash
cd face-recognition
```
Build image:
```bash
docker build ./ -t face-recognition

```
Run container
```bash
docker run -p 3500:3000 -it face-recognition

```
## Use
To utilize this API, begin by creating a directory named "labeled_images" within the "src" folder. Next, establish another directory using the individual's name or ID whom you intend to recognize. Populate this directory with a minimum of five images featuring the individual's face—more images enhance accuracy. Finally, access the path '/reconUserface' with a multipart form-data, including the identification and the image.

## Technologies
<ul>
  <li>axios: 0.27.2</li>
  <li>@tensorflow/tfjs-node: 1.7.4</li>
  <li>axios: 1.6.4</li>
  <li>canvas: 2.11.2</li>
  <li>cors: 2.8.5</li>
  <li>dotenv: 16.3.1</li>
  <li>express: 4.18.1</li>
  <li>face-api.js: 0.22.2</li>
  <li>multer: 1.4.5-lts.1</li>
  <li>node-fetch: 3.3.1</li>
  <li>nodemon: 2.0.16</li>
</ul>

## Infos
<p>Author: <a href="https://github.com/ravinmor">Ravin Mor</a></p>
<p>Email contact: ravinmmor@gmail.com or ravinmenezes@outlook.com</p>
