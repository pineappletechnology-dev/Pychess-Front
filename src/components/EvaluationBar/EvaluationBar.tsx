'use client'

interface EvaluationBarProps {
    winProbabilityWhite: number;
    winProbabilityBlack: number;
}

export default function EvaluationBar({
    winProbabilityWhite,
    winProbabilityBlack
}: EvaluationBarProps) {
    return (
        <div className="flex flex-col w-14 h-[400px] bg-gradient-to-b from-slate-300 to-slate-400 rounded-xl border border-slate-300 overflow-hidden">
            {/* Seção das Pretas */}
            <div
                className="bg-gradient-to-b from-slate-800 to-slate-900 flex items-end justify-center text-white font-semibold text-xs transition-all duration-500 ease-in-out relative group"
                style={{ height: `${winProbabilityBlack}%` }}
            >
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 pb-2 drop-shadow-lg">{winProbabilityBlack}%</span>
            </div>

            {/* Linha divisória */}
            <div className="h-0.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 shadow-sm"></div>

            {/* Seção das Brancas */}
            <div
                className="bg-gradient-to-t from-slate-100 to-white flex items-start justify-center text-slate-800 font-semibold text-xs transition-all duration-500 ease-in-out relative group"
                style={{ height: `${winProbabilityWhite}%` }}
            >
                <div className="absolute inset-0 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 pt-2 drop-shadow-sm">{winProbabilityWhite}%</span>
            </div>
        </div>
    );
}
