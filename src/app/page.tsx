// src/app/page.tsx

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-white drop-shadow-lg animate-bounce">
          Hello, World!
        </h1>
        <p className="mt-4 text-xl text-gray-100">
          Bem-vindo ao mundo estilizado com Tailwind CSS!
        </p>
        <button className="mt-6 px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-lg hover:bg-purple-100 transition duration-300">
          Clique Aqui
        </button>
      </div>
    </div>
  );
}