import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

const serialize = formData =>
  Array.from(formData.keys()).reduce(
    (data, key) => ({
      ...data,
      [key]: formData.get(key)
    }),
    {}
  );

export default dom => {
  const submitMessageEvent$ = dom.select("form").on("submit");

  const sendMessageIntent$ = submitMessageEvent$
    .do(event => event.preventDefault())
    .map(event => event.target)
    .map(formElement => new FormData(formElement))
    .map(formData => serialize(formData));

  return sendMessageIntent$;
};
