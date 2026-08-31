import org.testng.annotations.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

public class SignupTest extends BaseTest {

    @Test
    public void signupTest() {

        String email = "signup-test2026@test.com";

        // Step 1: Send OTP and capture the OTP from response
        String otp =
            given()
                .spec(requestSpecification)
                .body("""
                    {
                        "email": "%s"
                    }
                    """.formatted(email))

            .when()
                .post("/auth/sendotp")

            .then()
                .statusCode(200)
                .body("success", equalTo(true))
                .body("message", equalTo("OTP Sent Successfully"))
                .extract()
                .path("otp");


        // Step 2: Signup using the OTP
        given()
            .spec(requestSpecification)
            .body("""
                {
                    "firstName": "Test",
                    "lastName": "User",
                    "email": "%s",
                    "accountType": "Student",
                    "password": "Test@123",
                    "confirmPassword": "Test@123",
                    "otp": "%s"
                }
                """.formatted(email, otp))

        .when()
            .post("/auth/signup")

        .then()
            .statusCode(200)
            .body("success", equalTo(true))
            .body("message", equalTo("User registered successfully"));
    }
}