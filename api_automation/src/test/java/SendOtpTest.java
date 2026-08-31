import org.testng.annotations.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

public class SendOtpTest {

    @Test
    public void sendOtpTest() {

        given()
            .header("Content-Type", "application/json")
            .body("""
                {
                    "email": "saifi.kam123@.com"
                }
                """)

        .when()
            .post("http://localhost:4000/api/v1/auth/sendotp")

        .then()
            .statusCode(200)
            .body("success", equalTo(true))
            .body("message", equalTo("OTP Sent Successfully"));
    }
}