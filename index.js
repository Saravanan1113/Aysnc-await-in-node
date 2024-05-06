const fs = require('fs');
const superAgent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('File not found to read');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('File not found to write');
      resolve('success');
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1 = superAgent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2 = superAgent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3 = superAgent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res = await Promise.all([res1, res2, res3]);
    const imgs = res.map((el) => el.body.message);
    console.log(imgs);
    await writeFilePro('dog-img.txt', imgs.join('\n'));
    console.log('Random dog image saved');
  } catch (err) {
    console.log(err);
  }
  return '2:Ready';
};

(async () => {
  try {
    console.log('1:will get dog pics');
    const x = await getDogPic();
    console.log(x);
    console.log('3:Done getting dog pics');
  } catch (err) {
    console.log('ERROR ');
  }
})();

// console.log('1:will get dog pics');
// getDogPic()
//   .then((x) => {
//     console.log(x);
//     console.log('3:Done getting dog pics');
//   })
//   .catch((err) => {
//     console.log('ERROR ');
//   });

// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Bread: ${data}`);

//     return superAgent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);

//     return writeFilePro('dog-img.txt', res.body.message);
//   })
//   .then(() => {
//     console.log('Random dog image saved');
//   })
//   .catch((err) => {
//     console.log(err);
//   });
