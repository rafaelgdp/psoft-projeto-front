const https = require('http')

function registerCourse(course) {
  course.name = encodeURIComponent(course.name)
  let data = JSON.stringify(course)

  const options = {
    hostname: 'localhost',
    port: 8080,
    path: '/v1/courses',
    method: 'POST',
    cache: "no-cache",
    credentials: 'same-origin',
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      'Content-Length': data.length
    }
  }

  const req = https.request(options, (res) => {
    console.log(`Enviei ${course.name} e recebi o statusCode: ${res.statusCode}`)

    res.on('data', (d) => {
      process.stdout.write(d)
    })

  })

  req.on('error', (error) => {
    console.error(error)
  })

  req.write(data)
  req.end()
}

let courses = [{ "name": "ADMINISTRAÇÃO" }, { "name": "ADMINISTRAÇÃO DE SISTEMAS" }, { "name": "ADMINISTRAÇÃO DE SISTEMAS DE INFORMAÇÃO" }, { "name": "ALGEBRA LINEAR I" }, { "name": "ALGORITMOS AVANÇADOS I" }, { "name": "ALGORITMOS AVANCADOS II" }, { "name": "ALGORITMOS AVANCADOS III" }, { "name": "ANÁLISE DE SISTEMAS" }, { "name": "ANÁLISE E TÉCNICAS DE ALGORITMOS" }, { "name": "APLICAÇÕES DE GRAFOS" }, { "name": "APLICAÇÕES DE PLP" }, { "name": "AVALIAÇÃO DE DESEMPENHO DE SISTEMAS DISCRETOS" }, { "name": "BANCO DE DADOS 1" }, { "name": "BANCO DE DADOS 2" }, { "name": "BASQUETEBOL FEM" }, { "name": "BASQUETEBOL MAS" }, { "name": "CALCULO DIFERENCIAL E INTEGRAL I" }, { "name": "CALCULO DIFERENCIAL E INTEGRAL II" }, { "name": "CÁLCULO NUMÉRICO" }, { "name": "CIÊNCIA DE DADOS DESCRITIVA" }, { "name": "CIÊNCIA DE DADOS PREDITIVA" }, { "name": "COMPILADORES" }, { "name": "DESENVOLVIMENTO DE APLICAÇÕES CORPORATIVAS AVANÇADAS" }, { "name": "DIREITO E CIDADANIA" }, { "name": "ECONOMIA" }, { "name": "ECONOMIA DE TECNOLOGIA DA INFORMAÇÃO" }, { "name": "EMPREENDEDORISMO" }, { "name": "EMPREENDEDORISMO EM SOFTWARE" }, { "name": "ENGENHARIA DE SOFTWARE" }, { "name": "ESTÁGIO INTEGRADO" }, { "name": "ESTÁGIO INTEGRADO I" }, { "name": "ESTAGIO INTEGRADO II" }, { "name": "ESTAGIO INTEGRADO III" }, { "name": "ESTATÍSTICA APLICADA" }, { "name": "ESTRUTURA DE DADOS" }, { "name": "FUNDAMENTOS DE MATEMATICA PARA CIÊNCIA DA COMPUTACAO I" }, { "name": "FUNDAMENTOS DE MATEMATICA PARA CIÊNCIA DA COMPUTACAO II" }, { "name": "FUNDAMENTOS DE PROGRAMAÇÃO CONCORRENTE" }, { "name": "FUTSAL" }, { "name": "GERÊNCIA DE REDES DE COMPUTADORES" }, { "name": "GESTÃO DE PROJETOS" }, { "name": "GESTÃO DE SISTEMAS DE INFORMAÇÃO" }, { "name": "GOVERNÂNCIA DA INTERNET" }, { "name": "INFORMÁTICA E SOCIEDADE" }, { "name": "INGLÊS" }, { "name": "INTELIGÊNCIA ARTIFICIAL" }, { "name": "INTERCONEXÃO DE REDES DE COMPUTADORES" }, { "name": "INTRODUÇÃO A BANCO DE DADOS E MINERAÇÃO DE DADOS" }, { "name": "INTRODUÇÃO À CIÊNCIA DA COMPUTAÇÃO" }, { "name": "INTRODUÇÃO À COMPUTAÇÃO" }, { "name": "INTRODUÇÃO À PROBABILIDADE" }, { "name": "JOGOS DIGITAIS" }, { "name": "LABORATÓRIO DE ENGENHARIA DE SOFTWARE" }, { "name": "LABORATÓRIO DE ESTRUTURA DE DADOS" }, { "name": "LABORATÓRIO DE INTERCONEXÃO DE REDES DE COMPUTADORES" }, { "name": "LABORATÓRIO DE ORGANIZAÇÃO E ARQUITETURA DE COMPUTADORES" }, { "name": "LABORATÓRIO DE PROGRAMAÇÃO 1" }, { "name": "LABORATÓRIO DE PROGRAMAÇÃO 2" }, { "name": "LEITURA E PRODUÇÃO DE TEXTO" }, { "name": "LÍNGUA PORTUGUESA" }, { "name": "LÓGICA PARA COMPUTAÇÃO" }, { "name": "METODOLOGIA CIENTÍFICA" }, { "name": "MÉTODOS E SOFTWARE NUMÉRICOS" }, { "name": "MÉTODOS ESTATÍSTICOS" }, { "name": "ORGANIZAÇÃO E ARQUITETURA DE COMPUTADORES" }, { "name": "PARADIGMAS DE LINGUAGENS DE PROGRAMAÇÃO" }, { "name": "PERCEPÇÃO COMPUTACIONAL" }, { "name": "PRÁTICA DE ENSINO DE COMPUTAÇÃO I" }, { "name": "PRÁTICA DE ENSINO DE COMPUTAÇÃO II" }, { "name": "PRINCÍPIOS DE DESENVOLVIMENTO WEB" }, { "name": "PROGRAMAÇÃO 1" }, { "name": "PROGRAMAÇÃO 2" }, { "name": "PROGRAMAÇÃO CONCORRENTE" }, { "name": "PROGRAMAÇÃO FUNCIONAL" }, { "name": "PROJETO DE REDES DE COMPUTADORES" }, { "name": "PROJETO DE SISTEMAS OPERACIONAIS" }, { "name": "PROJETO DE SOFTWARE" }, { "name": "PROJETO DE TRABALHO DE CONCLUSAO DE CURSO" }, { "name": "PROJETO EM COMPUTAÇÃO 1" }, { "name": "PROJETO EM COMPUTAÇÃO 2" }, { "name": "RECUPERAÇÃO DA INFORMAÇÃO E BUSCA NA WEB" }, { "name": "REDES DE COMPUTADORES" }, { "name": "SEMINÁRIOS" }, { "name": "SEMINÁRIOS (EDUCAÇÃO AMBIENTAL)" }, { "name": "SISTEMAS DE APOIO À DECISÃO" }, { "name": "SISTEMAS DE INFORMAÇÃO II" }, { "name": "SISTEMAS DE RECUPUPERAÇÃO DA INFORMAÇÃO" }, { "name": "SISTEMAS OPERACIONAIS" }, { "name": "SOCIOLOGIA INDUSTRIAL I" }, { "name": "TÉCNICAS DE PROGRAMAÇÃO" }, { "name": "TEORIA DA COMPUTAÇÃO" }, { "name": "TEORIA DOS GRAFOS" }, { "name": "TRABALHO DE CONCLUSAO DE CURSO" }, { "name": "VERIFICACAO E VALIDAÇÃO DE SOFTWARE" }, { "name": "VISÃO COMPUTACIONAL" }, { "name": "VISUALIZAÇÃO DE DADOS" }]

for (var course in courses) {
  registerCourse(courses[course])
}