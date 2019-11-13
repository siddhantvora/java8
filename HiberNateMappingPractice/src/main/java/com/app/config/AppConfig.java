package com.app.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableWebMvc
@ComponentScan("com.app")
public class AppConfig {

    /*@Bean
    public ViewResolver viewResolver() {
        InternalResourceViewResolver viewResolver=new InternalResourceViewResolver("/WEB-INF/pages/",".jsp");
        viewResolver.setViewClass(JstlView.class);
        return viewResolver;
    }*/

}
