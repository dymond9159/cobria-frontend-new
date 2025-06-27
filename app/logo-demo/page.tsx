import Logo from "@/components/logo"

export default function LogoDemo() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-white p-8">
      <h1 className="text-2xl font-bold">Logo Component Demo</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col items-center gap-2 rounded-lg border p-6">
          <h2 className="text-lg font-semibold">Default Logo</h2>
          <Logo />
        </div>

        <div className="flex flex-col items-center gap-2 rounded-lg border p-6">
          <h2 className="text-lg font-semibold">Large Logo</h2>
          <Logo size={60} />
        </div>

        <div className="flex flex-col items-center gap-2 rounded-lg border p-6">
          <h2 className="text-lg font-semibold">Text Only</h2>
          <Logo textOnly size={40} />
        </div>

        <div className="flex flex-col items-center gap-2 rounded-lg border p-6">
          <h2 className="text-lg font-semibold">Icon Only</h2>
          <Logo iconOnly size={40} />
        </div>

        <div
          className="flex flex-col items-center gap-2 rounded-lg border p-6 text-white"
          style={{ backgroundColor: "#332f91" }}
        >
          <h2 className="text-lg font-semibold">On Dark Background</h2>
          <Logo textClassName="text-white" iconClassName="text-white" />
        </div>

        <div className="flex flex-col items-center gap-2 rounded-lg border p-6">
          <h2 className="text-lg font-semibold">Custom Colors</h2>
          <Logo textClassName="text-blue-600" iconClassName="text-green-500" />
        </div>
      </div>
    </div>
  )
}
