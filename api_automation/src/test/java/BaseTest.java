import io.restassured.builder.RequestSpecBuilder;
import io.restassured.specification.RequestSpecification;

public class BaseTest {

    protected RequestSpecification requestSpecification;

    public BaseTest() {

        String baseUrl = System.getProperty(
                "baseUrl",
                "http://localhost:4000"
        );

        requestSpecification = new RequestSpecBuilder()
                .setBaseUri(baseUrl)
                .setBasePath("/api/v1")
                .setContentType("application/json")
                .build();
    }
}