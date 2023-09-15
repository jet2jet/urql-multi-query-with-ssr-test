import { gql, useQuery } from 'urql';

const TODOS_QUERY = gql`
  query Todos {
    todo {
      todos {
        id
        title
      }
    }
  }
`;

interface TodosQuery {
  todo: {
    todos: {
      id: string;
      title: string;
    }[];
  };
}

const TODOS_DETAILED_QUERY = gql`
  query TodosDetailed {
    todo {
      todos {
        id
        title
        description
      }
    }
  }
`;

export interface TodoListProps {
  detailed?: boolean;
}

export default function TodoList({ detailed = false }: TodoListProps) {
  const [result] = useQuery<TodosQuery>({
    query: detailed ? TODOS_DETAILED_QUERY : TODOS_QUERY,
  });

  const { data, fetching, error } = result;

  return (
    <div>
      {fetching && <p>Loading...</p>}

      {error && <p>Oh no... {error.message}</p>}

      {data && (
        <ul>
          {data.todo.todos.map((todo) => (
            <li key={todo.id}>
              {todo.title} (ID: {todo.id})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
