export default function loadMore(res, current) {
  const reposLoad = [];

  if (res.length > current) {
    for (let i = 0; i < current; i++) {
      res[i].main = true;
      reposLoad.push(res[i]);
    }
  } else {
    for (let i = 0; i < res.length; i++) {
      res[i].main = true;
      reposLoad.push(res[i]);
    }
  }

  return reposLoad;
}
