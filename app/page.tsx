"use client";

import { useState } from "react";

type Todo = {
  id: string;
  texto: string;
  completado: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [nuevaTarea, setNuevaTarea] = useState("");

  function handleCreate(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;

    const texto = nuevaTarea.trim();
    if (texto === "") return;

    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), texto, completado: false },
    ]);
    setNuevaTarea("");
  }

  function handleUpdateTexto(id: string, nuevoTexto: string) {
    const textoLimpio = nuevoTexto.trim();
    if (textoLimpio === "") return;

    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, texto: textoLimpio } : t))
    );
  }

  function handleToggleCompletado(id: string) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completado: !t.completado } : t))
    );
  }

  function handleDelete(id: string) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h1 className="mb-4 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          MIS TAREAS
        </h1>

        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          onKeyDown={handleCreate}
          placeholder="+ Escribe una nueva tarea..."
          className="mb-4 w-full rounded-lg border border-dashed border-zinc-300 bg-transparent px-3 py-2 text-sm text-zinc-800 outline-none placeholder:text-zinc-400 focus:border-emerald-500 dark:border-zinc-700 dark:text-zinc-100"
        />

        <ul className="flex flex-col gap-2">
          {todos.length === 0 && (
            <li className="py-4 text-center text-sm text-zinc-400">
              No hay tareas todavía.
            </li>
          )}

          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-3 rounded-lg border border-zinc-100 px-3 py-2 dark:border-zinc-800"
            >
              <button
                onClick={() => handleToggleCompletado(todo.id)}
                aria-label="Marcar como completada"
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs transition-colors ${
                  todo.completado
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : "border-zinc-300 text-transparent dark:border-zinc-600"
                }`}
              >
                ✓
              </button>

              <input
                type="text"
                defaultValue={todo.texto}
                onBlur={(e) => handleUpdateTexto(todo.id, e.target.value)}
                className={`flex-1 bg-transparent text-sm outline-none ${
                  todo.completado
                    ? "text-zinc-400 line-through"
                    : "text-zinc-800 dark:text-zinc-100"
                }`}
              />

              <button
                onClick={() => handleDelete(todo.id)}
                aria-label="Eliminar tarea"
                className="shrink-0 text-zinc-400 transition-colors hover:text-red-500"
              >
                🗑
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}