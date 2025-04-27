const pr = new Promise((res, rej) => {
  setTimeout(
    () =>
      new Promise((res, rej) => {
        throw new Error('Inner promise error');
      }),
    0,
  );
});

await pr.catch(err => {
  console.log('I cougth inner eror');
});
