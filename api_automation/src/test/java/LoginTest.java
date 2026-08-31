import org.testng.annotations.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

public class LoginTest extends BaseTest {

    @Test
    public void loginTest() {

        given()
            .spec(requestSpecification)
            .body("""
                {
                    "email": "mrmohd012@gmail.com",
                    "password": "Success1@"
                }
                """)

        .when()
            .post("/auth/login")

        .then()
            // .log().all()
            .statusCode(200)
            .body("success", equalTo(true))
            .body("message", equalTo("Logged in Successfully"))
            .body("token", notNullValue());
    }


    @Test
    public void loginWithWrongPasswordTest() {

        given()
            .spec(requestSpecification)
            .body("""
                {
                    "email": "mrmohd012@gmail.com",
                    "password": "WrongPassword123"
                }
                """)

        .when()
            .post("/auth/login")

        .then()
            .statusCode(401)
            .body("success", equalTo(false))
            .body("message", equalTo("Password is incorrect"));
    }


    // Test 3: Non-existing user
    @Test
    public void loginWithNonExistingUserTest() {

        given()
            .spec(requestSpecification)
            .body("""
                {
                    "email": "nonexistinguser@test.com",
                    "password": "Password123"
                }
                """)

        .when()
            .post("/auth/login")

        .then()
            .statusCode(403)
            .body("success", equalTo(false))
            .body("message", equalTo("User does not exist"));
    }


    // Test 4: Missing email and password
    @Test
    public void loginWithMissingFieldsTest() {

        given()
            .spec(requestSpecification)
            .body("""
                {
                }
                """)

        .when()
            .post("/auth/login")

        .then()
            .statusCode(403)
            .body("success", equalTo(false))
            .body("message", equalTo("All fields are required"));
    }
}