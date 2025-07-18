interface GenericButtonProps {
    text: string;
    type?: "button" | "submit" | "reset"; // Permite definir o tipo do botão
    onClick?: () => void;
}

export default function GenericButton({ text, type = "button", onClick }: GenericButtonProps) {
    return (
        <button type={type} 
            className="bg-blue-500 py-4 text-white px-40 mx-auto rounded-md font-medium text-lg cursor-pointer hover:bg-blue-400 transition-all" 
            onClick={onClick}>
            {text}
        </button>
    )
}