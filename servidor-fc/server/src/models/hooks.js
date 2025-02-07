const { SignosVitales } = require('./historiaclinica.models/signosvitales.model');
const { Examen } = require('./historiaclinica.models/examen.model');
const { Enfermedad } = require('./historiaclinica.models/enfermedades.model');
const { Aps } = require('./historiaclinica.models/atencion.model');
const { Historia } = require('./historiaclinica.models/historia.model');
const { Paciente } = require('./historiaclinica.models/paciente.model');

function setupHooks() {
    SignosVitales.addHook('beforeCreate', async (signosVitales, options) => {
        const lastSignoVital = await SignosVitales.findOne({
            where: { id_historia: signosVitales.id_historia },
            order: [['id_signos_vitales', 'DESC']],
        });

        if (lastSignoVital) {

            signosVitales.id_signos_vitales = parseInt(lastSignoVital.id_signos_vitales) + 1;
        } else {
            signosVitales.id_signos_vitales = 1;
        }
    });
    
    Examen.addHook('beforeCreate', async (examen, options) => {
        const lastExamen = await Examen.findOne({
            where: { id_historia: examen.id_historia },
            order: [['id_examen', 'DESC']],
        });

        if (lastExamen) {
            examen.id_examen = parseInt(lastExamen.id_examen) + 1;
        } else {
            examen.id_examen = 1;
        }
    });

    
    
    Paciente.addHook('afterCreate', async (paciente, options) => {
        try {
            await Historia.create({
                id_paciente: paciente.id_paciente,
                codigo_historia: `HIST-${paciente.id_paciente}`, // You can adjust the codigo_historia as needed
                fecha_historia: new Date(),
            });
        } catch (error) {
            console.error('Error creating Historia:', error);
            throw error;
        }
    });

}

module.exports = setupHooks;
