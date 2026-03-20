/**
 * Projeto: Automação de Gestão de Chamados
 * Objetivo: Identificar chamados críticos e formatar a planilha automaticamente.
 */

function processarChamados() {
  const planilha = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const dados = planilha.getDataRange().getValues(); // Pega todos os dados (Array 2D igual no Java)
  
  // Pula a primeira linha (cabeçalho)
  for (let i = 1; i < dados.length; i++) {
    let status = dados[i][1];     // Coluna B
    let prioridade = dados[i][2]; // Coluna C
    
    // Lógica de Negócio: Se for Alta prioridade e estiver Aberto, destaca em Vermelho
    if (status === "Aberto" && prioridade === "Alta") {
      planilha.getRange(i + 1, 1, 1, 3).setBackground("#ffcccc"); 
      console.log("Alerta: Chamado crítico encontrado na linha " + (i + 1));
    } else {
      planilha.getRange(i + 1, 1, 1, 3).setBackground(null); // Limpa se não for crítico
    }
  }
  
  SpreadsheetApp.getUi().alert("Processamento de chamados concluído com sucesso!");
}

// Cria um menu personalizado na planilha para facilitar o uso
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🤖 Automação N1')
    .addItem('Verificar Prioridades', 'processarChamados')
    .addToUi();
}
