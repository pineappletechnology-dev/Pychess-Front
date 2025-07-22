interface GenericButtonProps {
    text: string;
    type?: "button" | "submit" | "reset"; // Permite definir o tipo do botão
    onClick?: () => void;
}

export default function GenericButton({ text, type = "button", onClick }: GenericButtonProps) {
    return (
        <button type={type}
            className="bg-green-600 py-4 uppercase text-white px-28 md:px-40 mx-auto rounded-md font-medium text-lg cursor-pointer hover:bg-green-400 transition-all"
            onClick={onClick}>
            {text}
        </button>
    )
}