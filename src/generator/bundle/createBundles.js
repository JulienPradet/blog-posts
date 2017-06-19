const Observable = require("rxjs").Observable;
const createCompiler = require("./createCompiler");

const compile = paths => compiler$ => {
  return compiler$.flatMap(compiler =>
    Observable.create(observer => {
      compiler.run(function(err, stats) {
        if (err) {
          observer.error(err);
        } else {
          const result = stats.toJson();
          observer.next(result);
        }
        observer.complete();
      });
    })
  );
};

const createBundles = paths => entry$ => {
  const compiler$ = createCompiler(paths)(entry$);
  return compile(paths)(compiler$);
};

module.exports = createBundles;
