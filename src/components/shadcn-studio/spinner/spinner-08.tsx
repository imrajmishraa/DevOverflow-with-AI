import { Spinner } from '@/components/ui/spinner'

const SpinnerBlurDemo = () => {
  return (
    <div className="fixed inset-0 z-[6000] flex flex-col items-center justify-center bg-black/70 backdrop-blur-2xl select-none duration-500">
      
      {/* Background radial highlight glow */}
      <div className="absolute w-[350px] h-[350px] rounded-full bg-indigo-500/15 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute w-[250px] h-[250px] rounded-full bg-purple-500/10 blur-[100px] pointer-events-none animate-pulse" style={{ animationDelay: '1.5s' }} />

      {/* Clean Centered Premium Loader */}
      <div className="relative flex items-center justify-center">
        {/* Concentric glowing animated ping rings */}
        <div className="absolute w-16 h-16 rounded-full border-2 border-indigo-500/30 animate-ping opacity-60" />
        <div className="absolute w-24 h-24 rounded-full border border-purple-500/20 animate-ping opacity-40" style={{ animationDelay: '0.4s' }} />
        <div className="absolute w-32 h-32 rounded-full border border-indigo-500/10 animate-ping opacity-25" style={{ animationDelay: '0.8s' }} />
        
        {/* Main moving/rotating spinner */}
        <Spinner className="w-12 h-12 text-indigo-400 animate-spin drop-shadow-[0_0_15px_rgba(99,102,241,0.7)]" style={{ borderTopColor: 'transparent', borderWidth: '3px' }} />
      </div>

    </div>
  )
}

export default SpinnerBlurDemo
