import {component$, Slot} from "@builder.io/qwik";

export default component$(() => {
  return (
    <>
      <div class={"mx-auto"}>
        hoge
        <Slot />
      </div>
    </>
  );
});