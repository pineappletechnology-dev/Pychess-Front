interface InfoButtonProps {
    title: string;
    text: string;
    icon: React.ReactNode;
    onClick?: () => void;
}

export default function InfoButton({ icon, title, text, onClick }: InfoButtonProps) {
    return (
        <div className="hover:bg-blue-50 transition-all flex bg-white rounded-xl w-full py-5 border border-gray-300 items-center justify-center flex-col gap-1 cursor-pointer" onClick={onClick}>
            {icon}
            <div className="flex justify-center items-center flex-col mt-2">
                <p className="font-medium">{title}</p>
                <p className="text-sm">{text}</p>
            </div>
        </div>
    )
}