CREATE  DATABASE IF NOT EXISTS base_despacho;	#creacion de la base de datos
USE base_despacho; #uso de la tabla *activarla en cada inicio
#creacion de tablas
CREATE TABLE IF NOT EXISTS diccionario(
	palabra VARCHAR(45)NOT NULL,
    concepto VARCHAR(999)NOT NULL
)ENGINE=INNODB;
CREATE TABLE IF NOT EXISTS contador(
	id_contador INT NOT NULL auto_increment UNIQUE,
	nombreComContador VARCHAR(99)NOT NULL,#contador
    rango VARCHAR(45)NOT NULL,#rango
    contraseña VARCHAR(8) NOT NULL,
    PRIMARY KEY (id_contador)
)ENGINE=INNODB;
CREATE TABLE IF NOT EXISTS cliente(
	id_cliente  INT NOT NULL auto_increment unique,
	nombreComCliente VARCHAR(99)NOT NULL,
    rfc VARCHAR(13)NOT NULL unique,
    tipo VARCHAR(45)NOT NULL,
    PRIMARY KEY (id_cliente), 
    contador_id_contador INT NOT NULL,
    CONSTRAINT fdkcliente_contador
    FOREIGN KEY (contador_id_contador)
    REFERENCES contador(id_contador)
    on update cascade 
	on delete cascade
)ENGINE=INNODB;
CREATE TABLE IF NOT EXISTS carpeta(
	id_carpeta INT NOT NULL AUTO_INCREMENT UNIQUE,
    claveRFC VARCHAR(13) NOT NULL,
    descDocumentos VARCHAR(9999) NOT NULL,
    localizacion VARCHAR (2),
    cuentaBancaria varchar(20)NOT NULL UNIQUE,
    PRIMARY KEY (id_carpeta),
    cliente_id_cliente INT NOT NULL UNIQUE,
    CONSTRAINT fdkcarpeta_cliente
	FOREIGN KEY (cliente_id_cliente)
	REFERENCES cliente(id_cliente)
	on update cascade on delete cascade
)ENGINE=INNODB;
CREATE TABLE IF NOT EXISTS calendario(
	id_calendario INT NOT NULL auto_increment,
    fechaDeclaracion date NOT NULL,
    primary key(id_calendario),
	cliente_id_cliente int NOT NULL UNIQUE,
    CONSTRAINT fdkcalendario_cliente
	FOREIGN KEY (cliente_id_cliente)
	REFERENCES cliente(id_cliente)
	on update cascade on delete cascade
)ENGINE=INNODB;
#eliminar tablas
#DROP TABLE cliente; #contador cliente diccionario
#DROP DATABASE base_despacho;
#ingreso de datos
insert into contador values ('10001','Raul Torres Albores','fisica-extensa','h1234');
insert into contador values ('10002','Jaime Madrigal Camacho','fisica-extensa','s0987');
insert into contador values ('10003','Diaz Ruiz Rocio','moral-extensa','f23456a');
insert into contador values ('10004','Juan Rosales Gomez','moral-pequeña','dq91o');
insert into contador values ('10005','Pablo Vazquez Alfaro','fisica-pequeña','0je8l');
insert into contador values ('10006','Sonia Alfaro Cordero','moral-pequeña','w1520');
insert into contador values ('10007','Catalino Chinchilla López','fisica-pequeña','c929pp');
insert into contador values ('10008','Ricardo Arenales Ramos','moral-extensa','s1234jh');
insert into contador values ('10009','Aracely Najera Mejia','moral-extensa','72j96k');
insert into contador values ('10010','Isidro Picon Gabriel','fisica-pequeña','m0ijw39');

insert into cliente values ('00001','Rodriguez Pérez Elisa','ROPE870310MD9','fisica-pequeña','10005');
insert into cliente values ('00002','Hernandez Costa Carlos','HCC841026MM6','moral-extensa','10003');
insert into cliente values ('00003','Penagos Ruiz Mariana','PERM841008QX5','fisica-extensa','10002');
insert into cliente values ('00004','Santos Castillejos Rosario','SCR880712BT6','moral-pequeña','10006');
insert into cliente values ('00005','Nigenda Ochoa Mario','NOM850522UA4','moral-extensa','10003');
insert into cliente values ('00006','Rosas Conde Diego','ROCD991212NG9','fisica-extensa','10001');
insert into cliente values ('00007','Mendoza Francisco Claudia','MEFC860220RZ8','fisica-extensa','10001');
insert into cliente values ('00008','Torres Garcia Dennis','TOGD931021KJA','fisica-pequeña','10010');
insert into cliente values ('00009','Aliñado Chajón Fidel','ACF950613GM8','moral-pequeña','10004');
insert into cliente values ('00010','López Quiñonez Rafael','LQR940201B75','moral-pequeña','10004');

insert into carpeta values ('1','ROPE870310MD9','RFC, Firma electronica, acuse de declaraciones periodicas, acuse anual, documentos personales, Opinión de cumplimiento positiva','R3','01236547899512346870','1'); 
insert into carpeta values ('2','HCC841026MM6','RFC, Firma electronica, acuse de declaraciones periodicas, documentos personales, Opinión de cumplimiento positiva','H1','65412398708521470369','2'); 
insert into carpeta values ('3','PERM841008QX5','RFC, Firma electronica, acuse de declaraciones periodicas, acuse anual, documentos personales, Opinión de cumplimiento positiva','P1','98765432100147258369','3'); 
insert into carpeta values ('4','SCR880712BT6','RFC, Firma electronica, acuse de declaraciones periodicas, documentos personales, Opinión de cumplimiento positiva','S1','85236974100147369258','4'); 
insert into carpeta values ('5','NOM850522UA4','RFC, Firma electronica, acuse de declaraciones periodicas, acuse anual, documentos personales, Opinión de cumplimiento positiva','N3','7854931620571468196','5'); 
insert into carpeta values ('6','ROCD991212NG9','RFC, Firma electronica, acuse de declaraciones periodicas, acuse anual, documentos personales, Opinión de cumplimiento positiva','R3','12345678901234567890','6'); 
insert into carpeta values ('7','MEFC860220RZ8','RFC, Firma electronica, acuse de declaraciones periodicas, acuse anual, documentos personales, Opinión de cumplimiento positiva','M1','12345678901232467890','7'); 
insert into carpeta values ('8','TOGD931021KJA','RFC, Firma electronica, acuse de declaraciones periodicas, acuse anual, documentos personales, Opinión de cumplimiento positiva','T3','24567890123456789342','8'); 
insert into carpeta values ('9','ACF950613GM8','RFC, Firma electronica, acuse de declaraciones periodicas, acuse anual, documentos personales, Opinión de cumplimiento positiva','A1','123456789012345613221','9'); 
insert into carpeta values ('10','LQR940201B75','RFC, Firma electronica, acuse de declaraciones periodicas, acuse anual, documentos personales, Opinión de cumplimiento positiva','L4','351342434567890123456','10'); 

insert into calendario values ('1','2022-08-12','1');
insert into calendario values ('2','2022-12-15','2');
insert into calendario values ('3','2022-09-13','3');
insert into calendario values ('4','2022-11-20','4');
insert into calendario values ('5','2022-11-01','5');
insert into calendario values ('6','2022-08-22','6');
insert into calendario values ('7','2022-07-30','7');
insert into calendario values ('8','2022-10-19','8');
insert into calendario values ('9','2022-09-02','9');
insert into calendario values ('10','2022-11-13','10');

insert into diccionario values ('Activo','Los activos son los bienes que posee la empresa, pero también los derechos.');
insert into diccionario values ('Activo diferido','Se trata del cargo diferido; es decir, el gasto pagado por anticipado. Representa tanto los costes como los gastos que la empresa consumirá en el futuro pero que se pagan de forma anticipada');
insert into diccionario values ('Fondos propios','Los fondos propios son la parte de la empresa que ha sido financiada con dinero que es de sus propietarios. Entre esos fondos se incluye lo que se puso al constituir la empresa, lo que se haya aportado con posterioridad en sucesivas ampliaciones de capital y los beneficios que se han ido reteniendo en la empresa, en lugar de repartirse a los propietarios.');
insert into diccionario values ('Patrimonio neto','Tradicionalmente, se ha tomado como prácticamente sinónimos el concepto de fondos propios y el de patrimonio neto. Sin embargo, el Plan General de Contabilidad entiende el patrimonio neto como un concepto más amplio. Además de los fondos propios, forman parte del patrimonio neto las subvenciones, donaciones y legados y determinados ajustes contables que se realizan en ciertos instrumentos financieros.');
insert into diccionario values ('Financiación ajena','La financiación ajena son las deudas de la empresa. Entre ellas, encontramos, por ejemplo, la financiación que prestan los bancos o la que, en el caso de algunas grandes empresas, obtienen de la emisión de bonos, pagarés de empresa y otros títulos de deuda.');
insert into diccionario values ('IVA soportado','En los ingresos y gastos, el IVA tiene mucho que ver. Y, en concreto, el IVA soportado es el que paga la empresa por un servicio o al adquirir un producto. ');
insert into diccionario values ('Modelo 037','Es una declaración censal para que autónomos y empresas cursen el alta de su actividad en la Agencia Tributaria.');
insert into diccionario values ('Modelo 111','El modelo 111 del IRPF se aplica a los sujetos con hechos imponibles en su actividad económica. El modelo 111 tienen que presentarlo tanto empresarios, profesionales o sociedades que realizan el hecho imponible que obliga a su presentación.');
insert into diccionario values ('Modelo 115','Recoge retenciones e ingresos a cuenta sobre rendimientos procedentes del arrendamiento o subarrendamientos de inmuebles urbanos.');
insert into diccionario values ('Modelo 130','Es un pago a cuenta que se le hace a la Hacienda estatal y restará a la hora de calcular el impuesto de la Renta');
insert into diccionario values ('Modelo 131','Es un modelo de declaración trimestral de las retenciones a cuenta del IRPF que los autónomos en régimen de estimación objetiva (módulos) efectúan en sus facturas.');
insert into diccionario values ('Modelo 180','Es un resumen anual de las retenciones aplicadas al alquiler de inmuebles urbanos para desarrollar una actividad económica o profesional.');
insert into diccionario values ('Modelo 190','Es el resumen anual de las retenciones de IRPF practicadas en las nóminas de los trabajadores y en las facturas de profesionales y empresarios.');
insert into diccionario values ('Modelo 303','Es el modelo de autoliquidación del Impuesto sobre el Valor Añadido (IVA).');
insert into diccionario values ('Modelo 309','El modelo 309 de autoliquidaciones no periódicas de IVA está pensado para que quienes no están obligados a presentar los modelos 303 o 390 puedan ingresar el IVA.');
insert into diccionario values ('Modelo 347','Es un modelo de declaración anual sobre operaciones con terceros que superen los 3.005,06 euros al año.');
insert into diccionario values ('Modelo 349','Es una declaración informativa donde se recogen todas las operaciones intracomunitarias. Su presentación puede ser mensual, trimestral o anual.');
insert into diccionario values ('Modelo 390','Es una declaración fiscal en el que se resumen todas las operaciones sometidas a IVA durante el año (natural).');
insert into diccionario values ('Modelo 400','Es la declaración censal de autónomos y empresarios residentes en las Islas Canarias.');
insert into diccionario values ('Modelo 415','Es una declaración anual de operaciones con terceros en las Islas Canarias.');
insert into diccionario values ('Modelo 420','Es el modelo de autoliquidación del IGIC que deben presentar los autónomos y empresas residentes en las Islas Canarias.');
insert into diccionario values ('Modelo 425','Es una declaración recapitulativa del IGIC con todas las operaciones realizadas a lo largo del año.');
insert into diccionario values ('ROI','Retorno Sobre la Inversión (RSI). Éste es un indicador financiero que mide el beneficio resultado de una inversión por parte de la empresa y, por tanto, la efectividad de dicha inversión.');
insert into diccionario values ('NRC','Es el acrónimo de número de referencia completo y consiste en un código de 22 caracteres que sirve para identificar el pago de un tributo o tasa. Funciona como justificante del ingreso a la Agencia Tributaria.');
insert into diccionario values ('Utilidad fiscal neta','Se considera utilidad fiscal neta del ejercicio, la cantidad que se obtenga de restar al resultado fiscal del ejercicio, el impuesto sobre la renta pagado el importe de las partidas no deducibles para efectos de dicho impuesto y la participación de los trabajadores en las utilidades de las empresas.');
insert into diccionario values ('Créditos fiscales','Son créditos fiscales los que tenga derecho a percibir el Estado o sus organismos descentralizados que provengan de contribuciones, de aprovechamientos o de sus accesorios, incluyendo los que deriven de responsabilidades que el Estado tenga derecho a exigir de sus servidores públicos o de los particulares, así como aquéllos a los que las leyes les den ese carácter y el Estado tenga derecho a percibir por cuenta ajena.');
insert into diccionario values ('Arrendamiento financiero','Es el contrato por el cual una persona se obliga a otorgar a otra el uso o goce temporal de bienes tangibles a plazo forzoso, obligándose esta última a liquidar, en pagos parciales como contraprestación, una cantidad en dinero determinada o determinable que cubra el valor de adquisición de los bienes, las cargas financieras y los demás accesorios y a adoptar al vencimiento del contrato alguna de las opciones terminales que establece la Ley de la materia.');
insert into diccionario values ('Ingresos por la adquisición de bienes','Se consideran ingresos por adquisición de bienes la donación, los tesoros, la adquisición por prescripción, la enajenación de inmuebles, la enajenación de acciones o títulos de valor, la diferencia entre el valor de avaluó y el de enajenación, las construcciones instalaciones o mejoras permanentes en bienes inmuebles que, de conformidad con los contratos por los que se otorgó su uso o goce, queden a beneficio del propietario.');
insert into diccionario values ('Escisión de sociedades','Transmisión de la totalidad o parte de los activos, pasivos y capital de una sociedad residente en el país, a la cual se le denominará escindente, a otra u otras sociedades residentes en el país que se crean expresamente para ello, denominadas escindidas.');
insert into diccionario values ('Requisitos de las deducciones autorizadas','Las deducciones autorizadas en este Título deberán reunir los siguientes requisitos: que sean estrictamente indispensables o donativos con requisitos, estar amparados con un comprobante fiscal y que los pagos cuyo monto exceda los $2,000 se efectúen mediante cheque nominativo, transferencia electrónica, o los denominados monederos electrónicos autorizados por el SAT.');
insert into diccionario values ('ACRS','Sistema acelerado de recuperación del costo');
insert into diccionario values ('Principio de devengo','Es un principio contable según el cual los ingresos y los gastos de la actividad se deben registrar en el momento en que ocurren y no en el momento de su cobro o pago.');
insert into diccionario values ('Principio de importancia relativa','Es una regla contable que establece que la aplicación de algunos principios contables puede omitirse si las partidas obtenidas tras una actividad económica no poseen una importancia significativa');
insert into diccionario values ('Principio de no compensación','Según la normativa contable no se permite compensar cuentas de activo con cuentas de pasivo, ni gastos e ingresos aunque compartan el mismo origen.');
insert into diccionario values ('Principio de prudencia','El principio de prudencia establece las pautas para registrar los ingresos en el momento que se devenguen y los gastos en el momento que sean conocidos.');
insert into diccionario values ('Principio de uniformidad','Este principio estabece que una vez asentados unos criterios para la aplicación de los principios contables, estos deberán mantenerse siempre que no se modifiquen las circunstancias que propiciaron dicha elección.');
insert into diccionario values ('Principios de Contabilidad Generalmente Aceptados','Los principios contables son una serie de normas que deben ser seguidas para poder reflejar una imagen fiel de la actividad de la empresa. Son un conjunto de reglas y normas necesarias para la correcta contabilización del patrimonio y demás elementos económicos de una empresa.');
insert into diccionario values ('PCGA','Principios de Contabilidad Generalmente Aceptados');
insert into diccionario values ('Régimen de estimación directa','Es el tipo de régimen de tributación del IRPF en el que se encuadra la gran mayoría de autónomos y empresarios. Se divide en normal o simplificada.');
insert into diccionario values ('IRPF','Impuesto sobre la Renta de las Personas Físicas');
insert into diccionario values ('Régimen de tributación de IRPF','Es el método de determinación del pago del IRPF de las actividades económicas desarrolladas por autónomos y empresarios.');
insert into diccionario values ('Régimen de estimación objetiva','Es un régimen de tributación del IRPF para autónomos y empresarios. Para tributar por este sistema no se pueden superar determinados límites anuales de rendimientos que fija el Ministerio de Hacienda.');
insert into diccionario values ('Régimen de tributación de IVA','Es un conjunto de normas que regulan las obligaciones formales y materiales relativas al pago del IVA por parte de autónomos y empresas.');
insert into diccionario values ('Impuesto sobre bienes inmuebles','Es un impuesto directo y real, es decir, cae sobre la persona sin intermediarios.');
insert into diccionario values ('Impuesto sobre sucesiones y donaciones','Es un impuesto directo, personal, subjetivo y progresivo');
insert into diccionario values ('Impuesto de transmisiones patrimoniales','Es un impuesto de carácter indirecto que grava la compraventa de viviendas o la ampliación de capital');
insert into diccionario values ('Impuesto sobre Sociedades','El Impuesto sobre Sociedades (IS) es un tributo que grava la renta de la empresas y demás personas jurídicas');
insert into diccionario values ('IS','Impuesto sobre Sociedades');
insert into diccionario values ('Cierre fiscal','Al final del cierre contable, las empresas han de realizar ajustes que tengan en cuenta el pago de impuestos y deducciones.');
insert into diccionario values ('Cierre contable','Al final del ejercicio contable, las empresas deben cerrar sus cuentas de resultados y trasladar éstos a las cuentas de balance (activo, pasivo y patrimonio neto).');
insert into diccionario values ('Balance de apertura','El balance de apertura fija la situación desde la que parte la empresa para seguir con su actividad al comienzo del siguiente ejercicio.');

#pruebas ------------------------
#visualizacion de tablas
select* FROM carpeta ; # contador diccionario calendario cliente visualizacion de carpetas sin edicion 

#cambiar fecha de declaracion y documentos en las carpetas
select id_cliente from cliente where nombreComCliente = 'Hernandez Costa Carlos';
UPDATE calendario SET fechaDeclaracion='2022-09-13' where cliente_id_cliente='5';
update carpeta set descDocumentos= 'RFC' where cliente_id_cliente=1; #en .js es =variableConDocumentosExtraidos + nuevosDocumentos
 #extraer el id del contador para agregarlo al cliente
select id_contador from contador where nombreComContador = 'Raul Torres Albores';
#visualizacion de los clientes con sus fechas
select cliente.nombreComCliente, cliente.rfc, calendario.fechaDeclaracion from cliente join calendario on calendario.cliente_id_cliente = cliente.id_cliente;

create or replace view ConsultarCarpeta as
SELECT cliente.nombreComCliente, cliente.rfc, cliente.tipo,carpeta.descDocumentos, contador.nombreComContador, carpeta.cuentaBancaria, carpeta.localizacion  FROM carpeta INNER JOIN cliente ON carpeta.cliente_id_cliente = cliente.id_cliente INNER JOIN contador ON cliente.contador_id_contador = contador.id_contador;
select * from ConsultarCarpeta;

