/*
 * Comportamiento de la página. Sin dependencias.
 *  1) Los bloques de código son <pre data-file="..." data-lang="cs|sh"> en el HTML:
 *     acá se les pone la cabecera con el nombre del archivo y se colorea el código.
 *  2) Lo que escriben en la bitácora (inputs con data-k) queda guardado en el navegador.
 */
(function () {
  'use strict';

  /* ---------- 1) Bloques de código ---------- */

  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // Grupos: 1 comentario, 2 texto entre comillas, 3 directiva de Razor, 4 palabra clave de C#
  var CS = /(\/\/[^\n]*|@\*[\s\S]*?\*@)|(\$?"(?:[^"\\\n]|\\.)*")|(@(?:page|inject|bind|onclick|code|foreach|rendermode)\b)|(\b(?:namespace|public|private|class|void|new|var|int|string|if|else|return|readonly|foreach|in|is|null|using)\b)/g;

  function highlightCs(src) {
    var out = '', last = 0, m;
    CS.lastIndex = 0;
    while ((m = CS.exec(src)) !== null) {
      out += esc(src.slice(last, m.index));
      // Un comentario que contiene TODO se resalta como pendiente para el alumno.
      var cls = m[1] ? (m[1].indexOf('TODO') !== -1 ? 'todo' : 'cmt') : (m[2] ? 'str' : 'key');
      out += '<span class="' + cls + '">' + esc(m[0]) + '</span>';
      last = CS.lastIndex;
    }
    return out + esc(src.slice(last));
  }

  // Terminal: lo que va después de # es comentario y PUERTO se marca como dato a reemplazar.
  function highlightSh(src) {
    return src.split('\n').map(function (line) {
      var i = line.indexOf('#');
      var cmd = i === -1 ? line : line.slice(0, i);
      var cmt = i === -1 ? '' : line.slice(i);
      cmd = esc(cmd).replace(/PUERTO/g, '<span class="todo">PUERTO</span>');
      return cmd + (cmt ? '<span class="cmt">' + esc(cmt) + '</span>' : '');
    }).join('\n');
  }

  [].forEach.call(document.querySelectorAll('pre[data-file]'), function (pre) {
    var lang = pre.getAttribute('data-lang') || 'cs';
    var text = pre.textContent.replace(/\n+$/, '');

    var box = document.createElement('div');
    box.className = 'code';

    var bar = document.createElement('div');
    bar.className = 'bar';
    bar.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
    var file = document.createElement('span');
    file.className = 'file';
    file.textContent = pre.getAttribute('data-file');
    bar.appendChild(file);

    pre.innerHTML = lang === 'sh' ? highlightSh(text) : highlightCs(text);
    pre.parentNode.insertBefore(box, pre);
    box.appendChild(bar);
    box.appendChild(pre);
  });

  /* ---------- 2) Bitácora ---------- */

  var KEY = 'ejercicio-tareas-blazor';
  var store = {};
  try { store = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { store = {}; }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { /* sin almacenamiento: no pasa nada */ }
  }

  var fields = [].slice.call(document.querySelectorAll('[data-k]'));
  fields.forEach(function (el) {
    var k = el.getAttribute('data-k');
    if (store[k] != null) el.value = store[k];
    el.addEventListener('input', function () { store[k] = el.value; save(); });
  });

  var clear = document.getElementById('clear');
  if (clear) {
    clear.addEventListener('click', function () {
      store = {};
      save();
      fields.forEach(function (el) { el.value = ''; });
    });
  }
})();
