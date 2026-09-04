const db = require('../database/connection');
const telemetriaController = {
        registrarLeitura: async (req, res) => {
                try {
                  const { veiculo_id, velocidade, temperatura_motor } = req.body;
                  if (!veiculo_id || velocidade === undefined || temperatura_motor === undefined) {
                          return res.status(400).json({ erro: "Campos 'veiculo_id', 'velocidade' e 'temperatura_motor' sao obrigatorios." });
                  }
                  const veiculoExiste = await db('veiculos').where({ id: veiculo_id }).first();
                  if (!veiculoExiste) {
                          return res.status(404).json({ erro: "Veiculo informado nao existe no Banco de Dados." });
                  }
                  const [id] = await db('telemetria').insert({
                          veiculo_id,
                          velocidade,
                          temperatura_motor
                  });
                  res.status(201).json({ id, veiculo_id, velocidade, temperatura_motor, mensagem: "Leitura registrada com sucesso!" });
                } catch (erro) {
                        res.status(500).json({ erro: "Erro ao registrar leitura de telemetria." });
                }
        },
        listarRelatorioCompleto: async (req, res) => {
                try {
                        const { alerta } = req.query;
                        const query = db('telemetria')
                          .join('veiculos', 'veiculos.id', '=', 'telemetria.veiculo_id')
                          .select(
                            'telemetria.id as telemetria_id',
                                  'veiculos.placa',
                                  'veiculos.montadora',
                                  'veiculos.modelo',
                                  'telemetria.velocidade',
                                  'telemetria.temperatura_motor',
                                  'telemetria.capturado_em'
                          );

                        if (alerta === 'true') {
                                query.where('telemetria.temperatura_motor', '>', 95);
                        }

                        const relatorio = await query;
                        res.status(200).json(relatorio);
                } catch (erro) {
                        res.status(500).json({ erro: "Erro ao gerar relatorio com Inner Join." });
                }
        },
        buscarPorVeiculo: async (req, res) => {
                try {
                        const { id } = req.params;
                        const veiculoExiste = await db('veiculos').where({ id }).first();
                        if (!veiculoExiste) {
                                return res.status(404).json({ erro: "Veiculo informado nao existe no Banco de Dados." });
                        }
                        const leituras = await db('telemetria').where({ veiculo_id: id });
                        if (leituras.length === 0) {
                                return res.status(404).json({ erro: "Nenhuma leitura de telemetria encontrada para este veiculo." });
                        }
                        res.status(200).json(leituras);
                } catch (erro) {
                        res.status(500).json({ erro: "Erro ao buscar leituras de telemetria do veiculo." });
                }
        }
};
module.exports = telemetriaController;
