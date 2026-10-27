// Campo de formulario reutilizable (input, select o textarea) con mensaje de error.
export default function CampoFormulario({
  id,
  etiqueta,
  tipo = 'text',
  valor,
  onCambio,
  error = '',
  placeholder = '',
  opciones = null,
  ...resto
}) {
  const idError = `error-${id}`;
  const propsComunes = {
    id,
    value: valor,
    onChange: (e) => onCambio(e.target.value),
    'aria-invalid': error ? 'true' : 'false',
    'aria-describedby': error ? idError : undefined,
    ...resto,
  };
  const invalido = error ? ' is-invalid' : '';

  let control;
  if (opciones) {
    control = (
      <select className={`form-select${invalido}`} {...propsComunes}>
        {opciones.map((o) => (
          <option key={o.valor} value={o.valor}>
            {o.texto}
          </option>
        ))}
      </select>
    );
  } else if (tipo === 'textarea') {
    control = <textarea rows={3} className={`form-control${invalido}`} placeholder={placeholder} {...propsComunes} />;
  } else {
    control = <input type={tipo} className={`form-control${invalido}`} placeholder={placeholder} {...propsComunes} />;
  }

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {etiqueta}
      </label>
      {control}
      {error && (
        <div id={idError} className="invalid-feedback" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
