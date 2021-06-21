package be.cmiesse.tfStockAPI.security;

import be.cmiesse.tfStockAPI.security.jwt_support.JwtAuthenticationFilter;
import be.cmiesse.tfStockAPI.security.jwt_support.JwtTokenProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import static be.cmiesse.tfStockAPI.security.SecurityConstants.*;
@EnableWebSecurity
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtTokenProvider tokenProvider;

    public WebSecurityConfig(JwtTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }



    @Override
    @Bean
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // Désactive la gestion des attaques CSRF(FORGERY TOKEN)
        http.csrf().disable();
        // Point d'entrée
        http.authorizeRequests()
                .antMatchers(HttpMethod.POST, REGISTER_URL).permitAll()
                .antMatchers(HttpMethod.POST, LOGIN_URL).permitAll()
                .antMatchers(HttpMethod.GET, "/villes").permitAll()
                .antMatchers(HttpMethod.GET, "/types").permitAll()
                .antMatchers(HttpMethod.GET, "/produits").permitAll()
                .antMatchers("/h2-console/**").permitAll()
                .anyRequest().authenticated();

        // Activation de CORS
        http.cors();

        // Configuration des filtres
        http.addFilterBefore(new JwtAuthenticationFilter(tokenProvider), UsernamePasswordAuthenticationFilter.class)
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        // H2-console
        http.headers()
                .frameOptions()
                .disable();
        // Http BASIC
        //http.httpBasic();

    }

    @Bean
    public PasswordEncoder encoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource(){

        CorsConfiguration conf = new CorsConfiguration();

        conf.addAllowedOrigin("http://localhost:4200");
        conf.addAllowedMethod("*");
        conf.addAllowedHeader("*");
        conf.addExposedHeader("Authorization");
        conf.setAllowCredentials(true);

        return request -> conf;

    }
}

