import {component$, Slot} from "@builder.io/qwik";

export default component$(() => {
  return (
    <>
      <div class={"w-full flex content-center justify-center mt-10 text-cyan-900"}>
        <Slot />
      </div>
    </>
  );
});