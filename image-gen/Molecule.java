import java.awt.*;
import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;

import org.json.JSONObject;

import org.openscience.cdk.DefaultChemObjectBuilder;
import org.openscience.cdk.depict.DepictionGenerator;
import org.openscience.cdk.interfaces.IAtomContainer;
import org.openscience.cdk.layout.StructureDiagramGenerator;
import org.openscience.cdk.renderer.AtomContainerRenderer;
import org.openscience.cdk.renderer.RendererModel;
import org.openscience.cdk.renderer.SymbolVisibility;
import org.openscience.cdk.renderer.font.AWTFontManager;
import org.openscience.cdk.renderer.generators.BasicSceneGenerator;
import org.openscience.cdk.renderer.generators.standard.StandardGenerator;
import org.openscience.cdk.renderer.visitor.AWTDrawVisitor;
import org.openscience.cdk.smiles.SmilesParser;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;

public class Molecule {

    public String name;
    public String formula;
    public String smiles;

    private static final String PUBCHEM_BASE_URL = "https://pubchem.ncbi.nlm.nih.gov/rest/pug";

    public Molecule(String name) throws Exception {
        this.name = name;
        this.formula = getChemicalFormula(name);
        Thread.sleep(500);
        this.smiles = getSMILESNotation(name);
    }

    public Molecule (String name, String formula, String smiles) {
        this.name = name;
        this.formula = formula;
        this.smiles = smiles;
    }

    // Method to get chemical formula
    public static String getChemicalFormula(String chemicalName) throws Exception {
        String json = fetchFromPubChem(chemicalName, "MolecularFormula");
        JSONObject jsonObject = new JSONObject(json);
        return jsonObject.getJSONObject("PropertyTable")
                .getJSONArray("Properties")
                .getJSONObject(0)
                .getString("MolecularFormula");
    }

    // Method to get SMILES notation
    public static String getSMILESNotation(String chemicalName) throws Exception {
        String json = fetchFromPubChem(chemicalName, "CanonicalSMILES");
        JSONObject jsonObject = new JSONObject(json);
        return jsonObject.getJSONObject("PropertyTable")
                .getJSONArray("Properties")
                .getJSONObject(0)
                .getString("CanonicalSMILES");
    }


    public void generateLineStructure(String path) {
        try {

            // Parse the SMILES string
            SmilesParser parser = new SmilesParser(DefaultChemObjectBuilder.getInstance());
            IAtomContainer molecule = parser.parseSmiles(this.smiles);

            DepictionGenerator depiction = new DepictionGenerator();
            depiction.withSize(300, 300) // Optional: Set image size
                    .depict(molecule)
                    .writeTo(path); // Save as PNG
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void generateLewisStructure(String path) {
        try {

            // Parse the SMILES string
            SmilesParser parser = new SmilesParser(DefaultChemObjectBuilder.getInstance());
            IAtomContainer molecule = parser.parseSmiles(this.smiles);
            StructureDiagramGenerator sdg = new StructureDiagramGenerator();
            sdg.setMolecule(molecule);
            sdg.generateCoordinates();
            molecule = sdg.getMolecule();

            Font font = new Font("Verdana", Font.PLAIN, 18);

            // create the renderer, note the AWTFontManger isn't used but is provided to avoid NPE
            AtomContainerRenderer renderer
                    = new AtomContainerRenderer(Arrays.asList(new BasicSceneGenerator(),
                    new StandardGenerator(font)),
                    new AWTFontManager());

            RendererModel rendererModel = renderer.getRenderer2DModel();
            rendererModel.set(StandardGenerator.Visibility.class,
                    SymbolVisibility.all());

            // Create an image to render the molecule onto
            int width = 300;
            int height = 300;
            BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
            Graphics2D g2d = image.createGraphics();
            g2d.setColor(Color.WHITE);
            g2d.fillRect(0, 0, width, height);

            // Draw the molecule
            renderer.setup(molecule, new Rectangle(width, height));
            renderer.paint(molecule, new AWTDrawVisitor(g2d), new Rectangle(width, height), true);

            g2d.dispose();
            ImageIO.write(image, "PNG", new File(path));


        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String outputWithQuotes () {
        return "\"" + this.name + "\", \"" + this.formula + "\", \"" + this.smiles + "\"";
    }
    public String toString() {
        return this.name + ", " + this.formula + ", " + this.smiles;
    }

    // Helper method to fetch data from PubChem API
    private static String fetchFromPubChem(String chemicalName, String property) throws Exception {
        // Replace spaces with URL encoding
        String encodedName = chemicalName.replace(" ", "%20");
        // Construct the API endpoint URL
        String urlString = PUBCHEM_BASE_URL + "/compound/name/" + encodedName + "/property/" + property + "/JSON";

        URL url = new URL(urlString);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");

        int responseCode = conn.getResponseCode();
        if (responseCode != 200) {
            throw new RuntimeException("Search for " + chemicalName + " : " + property + "failed : HTTP error code : " + responseCode);
        }

        // Read the response
        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        StringBuilder response = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) {
            response.append(line);
        }
        br.close();
        return response.toString();
    }
}
