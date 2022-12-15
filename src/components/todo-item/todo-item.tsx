import { component$ } from "@builder.io/qwik";
import { todo } from "~/routes";

interface TodoItemProps {
  item: todo;
}
export default component$<TodoItemProps>((props) => {
  return (
    <>
      <div class={'w-full bg-white min-h-[40px] rounded-sm border-l-cyan-900 border-l-[4px] flex items-center'}>
        <div class={'h-full min-w-[14%] flex items-center justify-center'}>
          <input
            type={'checkbox'}
            class={'w-4 h-4 text-cyan-900 bg-white rounded border-gray-300 focus:ring-cyan-900  focus:ring-2 transition duration-200 cursor-pointer'}
            checked={props.item.done}
            onChange$={(e) => {
              props.item.done = e.target.checked;
            }}
          />
        </div>
        <div class={'flex-grow text-start'}>
          <label>{props.item.content}</label>
        </div>
      </div>
    </>
  );
});