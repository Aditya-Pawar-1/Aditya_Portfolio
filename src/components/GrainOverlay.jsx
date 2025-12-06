export default function GrainOverlay() {
    return (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden opacity-20 mix-blend-overlay">
            <div className="absolute inset-[-200%] h-[400%] w-[400%] animate-grain bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
        </div>
    )
}
