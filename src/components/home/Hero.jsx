import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      style={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        background:
          "linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7)), url('/camion.jpg') center/cover",
        color: "#fff",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "auto", padding: 20 }}>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ACCESORIOS PREMIUM PARA CAMIONES
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .15 }}
          style={{
            fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
            fontWeight: 900,
            maxWidth: 850
          }}
        >
          Diseñados para resistir.
          <br />
          Fabricados para destacar.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .3 }}
          style={{ maxWidth: 600 }}
        >
          Accesorios inoxidables de alta calidad
          para darle a tu camión el estilo que merece.
        </motion.p>

      </div>
    </section>
  );
}