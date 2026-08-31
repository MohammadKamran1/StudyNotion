import io.restassured.builder.RequestSpecBuilder;
import io.restassured.specification.RequestSpecification;

public class BaseTest {

    protected RequestSpecification requestSpecification;

    public BaseTest() {

        requestSpecification = new RequestSpecBuilder()
                .setBaseUri("http://localhost:4000")
                .setBasePath("/api/v1")
                .setContentType("application/json")
                .build();
    }
}