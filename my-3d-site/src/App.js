import Scene from "./components/Scene";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Scene />

      {/* iframe แสดงเว็บไซต์ */}
      <iframe
        src="https://example.com"
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          width: "400px",
          height: "300px",
          border: "none",
          background: "white",
        }}
      />
    </div>
  );
}