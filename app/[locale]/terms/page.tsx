import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12">
      <h1 className="mb-8 text-3xl font-bold text-primary">
        TÉRMINOS Y CONDICIONES DE USO DE LA PLATAFORMA COBRIA
      </h1>

      <div className="prose prose-lg max-w-none">
        <p className="lead">Fecha de última actualización: 20/02/2025</p>

        <h2>1. INTRODUCCIÓN</h2>
        <p>
          Estos Términos y Condiciones regulan el acceso y uso de la plataforma Cobria, un servicio
          de cobranza extrajudicial automatizada mediante inteligencia artificial, operado por LUIS
          FERNANDO MORLA MORA con domicilio en Quito y debidamente constituida bajo las leyes de la
          República del Ecuador. Al acceder y utilizar Cobria, el usuario acepta estos términos y
          condiciones en su totalidad. Si no está de acuerdo con ellos, deberá abstenerse de
          utilizar la plataforma.
        </p>

        <h2>2. DEFINICIONES</h2>
        <ul>
          <li>
            <strong>Plataforma:</strong> Sistema digital de cobranza extrajudicial automatizada
            desarrollado y operado por Cobria.
          </li>
          <li>
            <strong>Usuario:</strong> Persona natural o jurídica que accede y utiliza la plataforma
            para la gestión de cobranzas.
          </li>
          <li>
            <strong>Agente de IA:</strong> Inteligencia artificial designada para la gestión de
            cobranzas a nombre del usuario.
          </li>
          <li>
            <strong>Cliente:</strong> Empresa o persona que contrata los servicios de Cobria para
            recuperar sus deudas pendientes.
          </li>
        </ul>

        <h2>3. CONDICIONES DE USO</h2>
        <ul>
          <li>
            El usuario debe proporcionar información veraz y actualizada para el correcto
            funcionamiento del servicio.
          </li>
          <li>
            El usuario será el único responsable del uso de la plataforma y de la legalidad de sus
            acciones de cobranza.
          </li>
          <li>
            Cobria se reserva el derecho de suspender o cancelar cuentas en caso de uso indebido o
            incumplimiento de estos términos.
          </li>
        </ul>

        <h2>4. COSTOS Y PAGOS</h2>
        <ul>
          <li>El uso de la plataforma está sujeto a una suscripción mensual de $250 USD.</li>
          <li>
            Cada agente de IA con su número de teléfono adicional tendrá un costo mensual extra.
          </li>
          <li>
            El usuario asume los costos operativos de las gestiones de cobranza, incluyendo llamadas
            y mensajes enviados.
          </li>
          <li>
            Los pagos se realizarán de manera mensual a través de los métodos de pago habilitados en
            la plataforma.
          </li>
        </ul>

        <h2>5. PROPIEDAD INTELECTUAL</h2>
        <ul>
          <li>
            Todos los derechos de propiedad intelectual sobre la plataforma, incluyendo software,
            algoritmos y diseño, son propiedad de Cobria.
          </li>
          <li>
            Queda prohibida la reproducción, distribución o modificación no autorizada de cualquier
            elemento de la plataforma.
          </li>
        </ul>

        <h2>6. RESPONSABILIDAD</h2>
        <ul>
          <li>
            Cobria no garantiza la recuperación total de los montos adeudados, ya que el resultado
            de la cobranza depende de múltiples factores externos.
          </li>
          <li>
            Cobria no será responsable por el uso indebido que los usuarios hagan de la plataforma.
          </li>
          <li>
            El usuario exonera a Cobria de cualquier reclamación derivada del uso de la plataforma
            en contra de las leyes aplicables.
          </li>
        </ul>

        <h2>7. PROTECCIÓN DE DATOS PERSONALES</h2>
        <ul>
          <li>
            Cobria cumple con la normativa vigente en materia de protección de datos personales en
            la República del Ecuador.
          </li>
          <li>
            La información del usuario y de los deudores será tratada con estricta confidencialidad
            y solo para los fines del servicio.
          </li>
        </ul>

        <h2>8. MODIFICACIONES A LOS TÉRMINOS Y CONDICIONES</h2>
        <ul>
          <li>
            Cobria se reserva el derecho de modificar estos términos y condiciones en cualquier
            momento. Las modificaciones serán notificadas a los usuarios mediante la plataforma o
            correo electrónico.
          </li>
          <li>
            El uso continuo de la plataforma tras la publicación de cambios implica la aceptación de
            los mismos.
          </li>
        </ul>

        <h2>9. JURISDICCIÓN Y LEGISLACIÓN APLICABLE</h2>
        <ul>
          <li>Estos términos y condiciones se rigen por las leyes de la República del Ecuador.</li>
          <li>
            Cualquier controversia derivada del uso de la plataforma será resuelta ante los
            tribunales de la República del Ecuador.
          </li>
        </ul>

        <h2>10. CONTACTO</h2>
        <p>
          Para cualquier consulta o reclamación sobre estos términos y condiciones, el usuario puede
          contactarnos en luis-fernando-10@outlook.es.
        </p>

        <p className="mt-8 text-sm text-gray-500">Última actualización: 20/02/2025</p>
      </div>

      <div className="mt-12 flex justify-center">
        <Link href="/auth/register">
          <Button>Volver al Registro</Button>
        </Link>
      </div>
    </div>
  )
}
