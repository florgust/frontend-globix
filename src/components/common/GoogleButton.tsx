import { FcGoogle } from 'react-icons/fc';

export function GoogleButton() {
    return (
        <button
            type="button"
            className="bg-[#2E2E2E] text-white py-2 rounded-full font-medium flex items-center justify-center gap-2 hover:brightness-110 transition cursor-pointer w-3/4 mx-auto"
        >
            <FcGoogle size={20} />
            Entrar com o Google
        </button>
    );
}
