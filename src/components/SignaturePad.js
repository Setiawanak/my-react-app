import React, { useRef, useEffect } from "react";
import SignaturePad from "signature_pad";

export default function SignatureCanvas({ onSave }) {
  const canvasRef = useRef(null);
  const signaturePad = useRef(null);

  useEffect(() => {
    signaturePad.current = new SignaturePad(canvasRef.current);
    return () => signaturePad.current.off();
  }, []);

  const clear = () => signaturePad.current.clear();

  return (
    <div className="signature-container">
      <canvas
        ref={canvasRef}
        width={400}
        height={200}
        style={{ border: "1px solid #999" }}
      />
      <button type="button" onClick={clear}>
        Clear
      </button>
    </div>
  );
}
