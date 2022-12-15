import { $, component$, useStore, useWatch$ } from "@builder.io/qwik";
import TodoItem from "~/components/todo-item/todo-item";
import { genUuid } from "~/utilities/uuid";
import TodoFilterItem from "~/components/todo-filter-item/todo-filter-item";
export interface todo {
  id: string;
  done: boolean;
  content: string;
}

interface todoListStore {
  todoList: todo[];
  filterList: string[];
  selectedFilterName: string;
  filteredList: todo[];
}

export const allFilter = $((v: todo[]):todo[] => {
  return v.filter(() => true)
})
export const pendingFilter = $((v: todo[]):todo[] => {
  return v.filter((t) => !t.done)
})
export const doneFilter = $((v: todo[]):todo[] => {
  return v.filter((t) => t.done)
})


export default component$(() => {
  const store = useStore<todoListStore>({
    todoList: [],
    filterList: ["all", "pending", "done"],
    selectedFilterName: "all",
    filteredList: [],
  }, {recursive: true});

  useWatch$(async ({ track }) => {
    track(() => {store.todoList});
    track(() => {store.selectedFilterName});

    switch (store.selectedFilterName) {
      case 'all':
        const afn = await allFilter.resolve()
        store.filteredList = afn(store.todoList)
        break;
      case 'pending':
        const pfn = await pendingFilter.resolve()
        store.filteredList = pfn(store.todoList)
        break;
      case 'done':
        const dfn = await doneFilter.resolve()
        store.filteredList = dfn(store.todoList)
        break;
    }
  })

  return (
    <div class={"w-[700px] text-center"}>
      <h1 class={'text-5xl text-center'}>Todos</h1>

      <div class={"mt-11 w-full"}>
        <input
          id={"new-todo"}
          type={"text"}
          placeholder={"Add a new task + Enter"}
          autoComplete={"no"}
          class={'w-1/2 pl-[10px] h-[40px] rounded-md border-0 outline-0 focus:outline-0 focus:ring-0'}
          onChange$={async (e) => {
            const id = await genUuid();
            store.todoList = [...store.todoList, { id, done: false, content: e.target.value }];
            e.target.value = ""
          }}
        />

        <div class={"mt-11 mx-auto w-1/2 border-b-cyan-900 border-b-[1px] "}>
          <ul class={"flex justify-between"}>
            {
              store.filterList.map(name =>
                <li class={"flex-1"}>
                  <TodoFilterItem
                    isSelected={store.selectedFilterName === name}
                    label={name}
                    onTap$={() => {
                      store.selectedFilterName = name;
                    }}
                  />
                </li>
              )
            }
          </ul>
        </div>

        <div class={"mt-4 mx-auto w-1/2"}>
          <ul>
            {
              store.filteredList.map((td) =>
                <li className={"[&:nth-child(n+1)]:mt-[6px]"}>
                  <TodoItem
                    item={td}
                  />
                </li>
              )
            }
          </ul>
        </div>
      </div>
    </div>
  );
})