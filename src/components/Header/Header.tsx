export default function Header() {
    return (
        <header className="bg-white py-4 border-b border-gray-300">
            <div className="max-w-[1000px] flex justify-center mx-auto">
                <div className="flex items-center gap-2">
                    <div className="p-3 rounded-sm bg-blue-600 max-h-8 max-w-8 flex justify-center items-center">
                        <span className="text-2xl text-white">♛</span>
                    </div>
                    <p className="font-semibold text-xl">PyChess</p>
                </div>
            </div>
        </header>
    )
}