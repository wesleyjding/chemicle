import java.io.*;
import java.util.Arrays;

public class ChemicalReader {

    public static void main(String[] args) throws Exception {
        String[] alkanes; {
            alkanes = new String[]{
                    "methane",

                    "ethane",

                    "propane",
                    "2-methylpropane",
                    "2,2-dimethylpropane",
                    "1-bromopropane",
                    "1-iodopropane",

                    "butane",
                    "2-methylbutane",
                    "2,2-dimethylbutane",
                    "2,3-dimethylbutane",
                    "2,2,3-trimethylbutane",
                    "1-iodobutane",
                    "2-chlorobutane",

                    "pentane",
                    "2-methylpentane",
                    "3-methylpentane",
                    "2,3-dimethylpentane",
                    "2,4-dimethylpentane",
                    "3,3-dimethylpentane",
                    "3,3-diethylpentane",
                    "2,2,4-trimethylpentane",
                    "2,3,3-trimethylpentane",
                    "2,3,4-trimethylpentane",
                    "2,2,3,3-tetramethylpentane",
                    "3-ethyl-2-methylpentane",
                    "2-bromopentane",
                    "3-bromopentane",
                    "1-fluoropentane",
                    "3-fluoropentane",
                    "3-chloropentane",
                    "1,2-dichloropentane",

                    "hexane",
                    "3-methylhexane",
                    "2,3-dimethylhexane",
                    "2,4-dimethylhexane",
                    "3,3-dimethylhexane",
                    "3,3-diethylhexane",
                    "2,2,4-trimethylhexane",
                    "2,3,3-trimethylhexane",
                    "2,3,4-trimethylhexane",
                    "3,3,4-trimethylhexane",
                    "2,2,3,3-tetramethylhexane",
                    "3-ethyl-2-methylhexane",
                    "4-ethyl-2-methylhexane",
                    "2-bromo-3-chlorohexane",
                    "2,3-dichloro-2-methylhexane",

                    "heptane",
                    "4-methylheptane",
                    "2,3-dimethylheptane",
                    "2,4-dimethylheptane",
                    "3,3-dimethylheptane",
                    "3,3-diethylheptane",
                    "2,2,4-trimethylheptane",
                    "2,3,3-trimethylheptane",
                    "2,3,4-trimethylheptane",
                    "2,2,3,3-tetramethylheptane",
                    "3-ethyl-2-methylheptane",
                    "3,3-diethyl-2-methylheptane",
                    "3,3-diethyl-4-methylheptane",
                    "3,4-diethyl-2,3-dimethylheptane",
                    "4-propylheptane",
                    "2-methyl-4-propylheptane",
                    "4-tert-butylheptane",
                    "3,4-dibromoheptane",

                    "octane",
                    "2,3-dimethyloctane",
                    "2,4-dimethyloctane",
                    "2,5-dimethyloctane",
                    "3,4-dimethyloctane",
                    "4-ethyl-3-methyloctane",
                    "3-ethyl-4-methyloctane",
                    "3-ethyl-2-methyloctane",
                    "5-ethyl-2,4,6-trimethyloctane",
                    "4-tert-butyloctane",

                    "nonane",
                    "3-methylnonane",
                    "4-ethylnonane",
                    "2,3-dimethylnonane",
                    "3-ethyl-4-methylnonane",

                    "decane",
                    "5-methyldecane",
                    "3,4-dimethyldecane",
                    "2,7,8-trimethyldecane"
            };
        }
        String[] alkenes; {
            alkenes = new String[]{
                    "ethene",

                    "prop-1-ene",

                    "but-1-ene",
                    "but-2-ene",
                    "buta-1,3-diene",
                    "2-methylbut-2-ene",
                    "3,3-dimethylbut-1-ene",

                    "pent-1-ene",
                    "pent-2-ene",
                    "2-methylpent-1-ene",
                    "3-methylpent-2-ene",
                    "4-methylpent-2-ene",
                    "3-ethylpent-2-ene",
                    "2,3-dimethylpent-1-ene",
                    "3-ethyl-2-methylpent-1-ene",

                    "hex-1-ene",
                    "hex-2-ene",
                    "hexa-1,5-diene",
                    "5-methylhex-1-ene",
                    "3,4-diethylhex-2-ene",
                    "2,5-dimethylhexa-2,4-diene",
                    "2,5-dimethylhexa-1,5-diene",

                    "hept-1-ene",
                    "hept-2-ene",
                    "hept-3-ene",
                    "2-methylhept-1-ene",
                    "5,5-dimethylhept-3-ene",
                    "hepta-1,5-diene",
                    "hepta-1,6-diene",

                    "oct-3-ene",

                    "non-1-ene",
                    "non-4-ene",

                    "dec-2-ene"
            };
        }
        String[] alkynes; {
            alkynes = new String[]{
                    "prop-1-yne",

                    "but-1-yne",
                    "but-2-yne",
                    "buta-1,3-diyne",

                    "pent-1-yne",
                    "pent-2-yne",
                    "3-methylpent-1-yne",
                    "3-ethylpent-1-yne",
                    "4-methylpent-2-yne",
                    "4,4-dimethylpent-2-yne",
                    "penta-1,3-diyne",

                    "hex-1-yne",
                    "hex-2-yne",
                    "3-methylhex-1-yne",
                    "4-methylhex-2-yne",
                    "hexa-1,3-diyne",

                    "hept-1-yne",
                    "hept-2-yne",
                    "3-methylhept-1-yne",
                    "3-ethylhept-1-yne",
                    "hepta-1,3-diyne",

                    "oct-2-yne",
                    "5-methyloct-2-yne",

                    "deca-1,9-diyne"
            };
        }
        String[] alcohols; {
            alcohols = new String[]{
                    "methanol",

                    "ethanol",

                    "propan-1-ol",
                    "propan-2-ol",

                    "butan-1-ol",
                    "butan-2-ol",
                    "2,3-dimethylbutan-1-ol",
                    "butane-1,2-diol",
                    "3-methylbutane-1,2-diol",
                    "4,4,4-trifluoro-3-methylbutane-1,2-diol",

                    "pentan-1-ol",
                    "pentan-2-ol",
                    "2-methylpentan-1-ol",
                    "2-methylpentan-3-ol",
                    "pentane-1,2-diol",
                    "2-methylpentane-1,5-diol",

                    "hexan-1-ol",
                    "hexan-2-ol",
                    "hexan-3-ol",
                    "2-methylhexan-3-ol",

                    "3-chloroheptan-2-ol"
            };
        }
        String[] ketones; {
            ketones = new String[]{
                    "propan-2-one",

                    "butan-2-one",
                    "3-methylbutan-2-one",

                    "pentan-2-one",
                    "pentan-3-one",
                    "3-methylpentan-2-one",
                    "4-methylpentan-2-one",

                    "hexan-2-one",
                    "hexan-3-one",
                    "3-methylhexan-2-one",
                    "4-methylhexan-2-one",
                    "hexane-2,4-dione",
                    "hexane-2,5-dione",

                    "2-methylheptan-3-one",
                    "2-methylheptan-4-one",
                    "4,6-dimethylheptan-2-one",
                    "2,6-dimethylheptan-4-one",
                    "2,4-dimethylheptan-3-one",
                    "3,5-dimethylheptan-4-one"

            };
        }
        String[] carboxylicAcids; {
            carboxylicAcids = new String[]{
                    "formic acid",

                    "acetic acid",

                    "propanoic acid",
                    "2-methylpropanoic acid",
                    "2,2-dimethylpropanoic acid",
                    "propanedioic acid",

                    "butanoic acid",
                    "2-methylbutanoic acid",
                    "3-methylbutanoic acid",

                    "pentanoic acid",
                    "2-methylpentanoic acid",
                    "3-methylpentanoic acid",
                    "3,3-dimethylpentanoic acid",

                    "hexanoic acid",
                    "2-methylhexanoic acid",
                    "3-methylhexanoic acid",
                    "3-ethylhexanoic acid",
                    "2,3-dimethylhexanoic acid",
                    "hexanedioic acid",

                    "heptanoic acid",
                    "2-methylheptanoic acid",
                    "3-methylheptanoic acid",
                    "3-ethylheptanoic acid",

                    "octanoic acid",
                    "2-methyloctanoic acid",
                    "3-methyloctanoic acid",
                    "3-ethyloctanoic acid",

                    "nonanoic acid",

                    "decanoic acid",
            };
        }
        String[] aldehydes; {
            aldehydes = new String[]{
                    "methanal",

                    "ethanal",

                    "propanal",
                    "2-methylpropanal",
                    "2,2-dimethylpropanal",

                    "butanal",
                    "2-methylbutanal",
                    "2,2-dimethylbutanal",

                    "pentanal",
                    "2-methylpentanal",
                    "3-methylpentanal",
                    "3-ethylpentanal",
                    "2,2-dimethylpentanal",

                    "hexanal",
                    "2-methylhexanal",
                    "3-methylhexanal",
                    "3-ethylhexanal",
                    "2,2-dimethylhexanal",

                    "heptanal",
                    "2-methylheptanal",
                    "3-methylheptanal",
                    "3-ethylheptanal",
                    "2,3-dimethylheptanal",
                    "2,3,4-trimethylheptanal",
                    "2,2,4-trimethylheptanal",

                    "octanal",

                    "nonanal",

                    "decanal",
            };
        }
        String[] ethers; {
            ethers = new String[]{
                    "methoxymethane",
                    "dimethoxymethane",

                    "methoxyethane",
                    "ethoxyethane",

                    "1-methoxypropane",
                    "2-methoxypropane",
                    "2-ethoxypropane",
                    "2-ethoxy-2-methylpropane",
                    "1-(propoxymethoxy)propane",

                    "1-methoxybutane",
                    "2-methoxybutane",
                    "1-ethoxybutane",
                    "2-ethoxybutane",

                    "1-ethoxypentane",
                    "2-ethoxypentane",
                    "5-bromo-1,1,1-triethoxypentane",

                    "1,6-dimethoxyhexane",
                    "3,3-dimethoxyhexane",

                    "1,1-dimethoxyheptane"

            };
        }
        String[] esters; {
            esters = new String[]{
                    "methyl formate",

                    "methyl acetate",

                    "methyl propanoate",
                    "methyl 2-methylpropanoate",
                    "ethyl propanoate",
                    "ethyl 2-methylpropanoate",
                    "propyl propanoate",
                    "2-methylpropyl propanoate",
                    "propyl 2-methylpropanoate",

                    "methyl butanoate",
                    "ethyl butanoate",
                    "propyl butanoate",
                    "2-methylpropyl butanoate",
                    "propyl 2-methylbutanoate",
                    "butyl butanoate",
                    "3-methylbutyl butanoate",
                    "butyl 2-methylbutanoate",
                    "butyl 3-methylbutanoate"
            };
        }
        String[] amines; {
            amines = new String[]{
                    "methanamine",

                    "ethanamine",

                    "propan-1-amine",
                    "propan-2-amine",

                    "butan-1-amine",
                    "butan-2-amine",

                    "pentan-1-amine",
                    "2-methylpentan-1-amine",
                    "3-methylpentan-1-amine",
                    "2,2-dimethylpentan-1-amine",
                    "2,3-dimethylpentan-1-amine",
                    "pentan-2-amine",
                    "2-methylpentan-2-amine",
                    "3-methylpentan-2-amine",
                    "2,3-dimethylpentan-2-amine",
                    "3,3-dimethylpentan-2-amine",
                    "pentan-3-amine",
                    "2-methylpentan-3-amine",
                    "3-methylpentan-3-amine",
                    "2,2-dimethylpentan-3-amine",

                    "hexan-1-amine",
                    "2-methylhexan-1-amine",
                    "3-methylhexan-1-amine",
                    "2,2-dimethylhexan-1-amine",
                    "hexan-2-amine",
                    "2-methylhexan-2-amine",
                    "3-methylhexan-2-amine",
                    "3,3-dimethylhexan-2-amine",
                    "hexan-3-amine",
                    "2-methylhexan-3-amine",
                    "3-methylhexan-3-amine",
                    "2,3-dimethylhexan-3-amine"
            };
        }
        String[] amides; {
            amides = new String[]{
                    "methanamide",

                    "ethanamide",

                    "propanamide",
                    "2-methylpropanamide",

                    "butanamide",
                    "2-methylbutanamide",
                    "2,3-dimethylbutanamide",

                    "pentanamide",
                    "2-methylpentanamide",
                    "2,3-dimethylpentanamide",
                    "2,3,4-trimethylpentanamide",
                    "3-ethylpentanamide"
            };
        }
        String[] nitriles; {
            nitriles = new String[]{
                    "formonitrile",

                    "acetonitrile",

                    "propanenitrile",

                    "butanenitrile"
            };
        }
        String[] miscs; {
            miscs = new String[]{
                    "benzene",
                    "cyclopropane",

                    "cyclobutane",
                    "cyclobutene",

                    "cyclopentane",
                    "1,3-diethylcyclopentane",

                    "cyclohexane",

                    "propoxybenzene",


            };
        }

        generateAll(alkanes, alkenes, alkynes, alcohols, ketones, carboxylicAcids, aldehydes,
        ethers, esters, amines, amides, nitriles, miscs);

    }

    public static void generateAll(String[] alkanes, String[] alkenes, String[] alkynes,
                                   String[] alcohols, String[] ketones, String[] carboxylicAcids,
                                   String[] aldehydes, String[] ethers, String[] esters, String[] amines,
                                   String[] amides, String[] nitriles, String[] miscs) throws Exception {
        iterThroughList(alkanes, "alkane");
        iterThroughList(alkenes, "alkene");
        iterThroughList(alkynes, "alkyne");
        iterThroughList(alcohols, "alcohol");
        iterThroughList(ketones, "ketone");
        iterThroughList(carboxylicAcids, "carboxylicAcid");
        iterThroughList(aldehydes, "aldehyde");
        iterThroughList(ethers, "ether");
        iterThroughList(esters, "ester");
        iterThroughList(amines, "amine");
        iterThroughList(amides, "amide");
        iterThroughList(nitriles, "nitrile");
        iterThroughList(miscs, "misc");


        writeIDs(1, alkanes.length, "alkane", "assets/alkane-ids.txt");
        writeIDs(1, alkenes.length, "alkene", "assets/alkene-ids.txt");
        writeIDs(1, alkynes.length, "alkyne", "assets/alkyne-ids.txt");
        writeIDs(1, alcohols.length, "alcohol", "assets/alcohol-ids.txt");
        writeIDs(1, ketones.length, "ketone", "assets/ketone-ids.txt");
        writeIDs(1, carboxylicAcids.length, "carboxylicAcid", "assets/carboxylicAcid-ids.txt");
        writeIDs(1, aldehydes.length, "aldehyde", "assets/aldehyde-ids.txt");
        writeIDs(1, ethers.length, "ether", "assets/ether-ids.txt");
        writeIDs(1, esters.length, "ester", "assets/ester-ids.txt");
        writeIDs(1, amines.length, "amine", "assets/amine-ids.txt");
        writeIDs(1, amides.length, "amide", "assets/amide-ids.txt");
        writeIDs(1, nitriles.length, "nitrile", "assets/nitrile-ids.txt");
        writeIDs(1, miscs.length, "misc", "assets/misc-ids.txt");

        System.out.println("Alkanes Length:" + alkanes.length);
        System.out.println("Alkenes Length:" + alkenes.length);
        System.out.println("Alkynes Length:" + alkynes.length);
        System.out.println("Alcohols Length:" + alcohols.length);
        System.out.println("Ketones Length:" + ketones.length);
        System.out.println("Carboxylic Acids Length:" + carboxylicAcids.length);
        System.out.println("Aldehydes Length:" + aldehydes.length);
        System.out.println("Ethers Length:" + ethers.length);
        System.out.println("Esters Length:" + esters.length);
        System.out.println("Amines Length:" + amines.length);
        System.out.println("Amides Length:" + amides.length);
        System.out.println("Nitriles Length:" + nitriles.length);
        System.out.println("Miscs Length:" + miscs.length);
    }

    public static void iterThroughList(String[] chemicals, String type) throws Exception {
        for (int i = 0; i < chemicals.length; i++) {
            String name = chemicals[i];
            Molecule molecule = new Molecule(name);
            createFiles(type + "-" + String.format("%03d", i+1), molecule);
            Thread.sleep(800);
        }
    }

    public static void iterThroughList(String[] chemicals, String type, int startIndex) throws Exception {
        for (int i = startIndex; i < chemicals.length; i++) {
            String name = chemicals[i];
            Molecule molecule = new Molecule(name);
            createFiles(type + "-" + String.format("%03d", i+1), molecule);
            Thread.sleep(800);
        }
    }

    public static void writeIDs(int start, int end, String type, String path) throws Exception {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(path))) {
            for (int i = start; i <= end; i++) {
                writer.write(type + "-" + String.format("%03d", i));
                writer.newLine(); // Add a newline after each object
            }

        } catch (IOException e) {
            System.err.println("An error occurred while writing to the file: " + e.getMessage());
        }
    }

    public static void createFiles(String id, Molecule molecule) throws IOException {
        // Create the folder
        String folderPath = "assets/" + id;
        File folder = new File(folderPath);

        if (!folder.exists()) {
            if (folder.mkdir()) {
                System.out.println("Folder created: " + folderPath);
            } else {
                System.out.println("Failed to create folder: " + folderPath);
                return;
            }
        }

        try (BufferedWriter writer = new BufferedWriter(new FileWriter("assets/"+id+"/name.txt"))) {
            writer.write(molecule.outputWithQuotes());
        } catch (IOException e) {
            System.err.println("An error occurred while writing to the file: " + e.getMessage());
        }
        molecule.generateLineStructure("assets/"+id + "/line.png");
        molecule.generateLewisStructure("assets/"+id + "/lewis.png");
        System.out.println(id + ": " + molecule.name);
    }

}