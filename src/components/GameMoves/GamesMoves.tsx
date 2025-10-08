'use client'

interface GameMovesProps {
    moves: string[];
}

export default function GameMoves({ moves }: GameMovesProps) {
    return (
        <div className='bg-gray-50 mt-2 rounded-md border border-gray-300'>
            {moves.length === 0 ? (
                <p>Sem movimentos ainda...</p>
            ) : (
                moves.map((move, index) => (
                    <div key={index} className='px-4' style={{ background: index % 2 === 0 ? '#F9FAFB' : '#E5E7EB' }}>
                        {move && (
                            <p className='w-full flex justify-between py-2'>
                                <span className='text-gray-800 font-medium'>{index % 2 === 0 ? 'Robô' : 'Humano'}</span>
                                {move}
                            </p>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}
