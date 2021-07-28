package com.devsuperior.dscatalog.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicSessionCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class S3Config {

	//@Value("${aws.access_key_id}")
	private String awsId;

	//@Value("${aws.secret_access_key}")
	private String awsKey;


	//@Value("${aws.session_token}")
	private String token;

	//@Value("${s3.region}")
	private String region;

	//@Bean
	public AmazonS3 s3client() {
		
		BasicSessionCredentials cred = new BasicSessionCredentials(awsId, awsKey, token);

		AmazonS3 s3client = AmazonS3ClientBuilder.standard().withRegion(Regions.fromName(region))
							.withCredentials(new AWSStaticCredentialsProvider(cred)).build();
		return s3client;
	}
}
