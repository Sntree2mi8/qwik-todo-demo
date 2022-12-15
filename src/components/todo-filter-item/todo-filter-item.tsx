import { component$, PropFunction } from "@builder.io/qwik";

interface TodoFilterItemProps {
  isSelected: boolean,
  label: string,
  onTap$: PropFunction<() => void>
}

export default component$<TodoFilterItemProps>((props) => {
  return(
    <>
      <button
        class={props.isSelected ? "font-bold hover:text-cyan-700" : "hover:text-cyan-700"}
        onClick$={props.onTap$}
      >{props.label}</button>
    </>
  );
});