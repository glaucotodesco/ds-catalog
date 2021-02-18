package com.devsuperior.dscatalog.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;

@Configuration
@EnableAuthorizationServer
public class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter{
    
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtAccessTokenConverter accessTokenConverter;

    @Autowired
    private JwtTokenStore tokenStore;

    @Autowired
    private AuthenticationManager authenticationManager;


    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {

        //@formatter:off
        endpoints.authenticationManager(authenticationManager)
                 .tokenStore(tokenStore)      
                 .accessTokenConverter(accessTokenConverter);
        //@formatter:on
    }

    @Override
    public void configure(AuthorizationServerSecurityConfigurer security) throws Exception {
        
        //@formatter:off
        security.tokenKeyAccess("permitAll()")
                .checkTokenAccess("isAuthenticated()");
        //@formatter:on
    }

    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
        
        //@formatter:off
        clients.inMemory()
               .withClient("dscatalog")
               .secret(passwordEncoder.encode("dscatalog123"))
               .scopes("read","write")
               .authorizedGrantTypes("password")
               .accessTokenValiditySeconds(86400);
        //@formatter:on
    }

}
